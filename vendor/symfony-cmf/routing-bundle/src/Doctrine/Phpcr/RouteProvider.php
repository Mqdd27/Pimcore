<?php

/*
 * This file is part of the Symfony CMF package.
 *
 * (c) Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Cmf\Bundle\RoutingBundle\Doctrine\Phpcr;

use Doctrine\DBAL\Exception\TableNotFoundException;
use Doctrine\ODM\PHPCR\DocumentManager;
use Doctrine\ODM\PHPCR\DocumentManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use PHPCR\RepositoryException;
use PHPCR\Util\UUIDHelper;
use Psr\Log\LoggerInterface;
use Psr\Log\NullLogger;
use Symfony\Cmf\Bundle\RoutingBundle\Doctrine\DoctrineProvider;
use Symfony\Cmf\Component\Routing\Candidates\CandidatesInterface;
use Symfony\Cmf\Component\Routing\RouteProviderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\Routing\Route as SymfonyRoute;
use Symfony\Component\Routing\RouteCollection;

/**
 * Loads routes from Doctrine PHPCR-ODM.
 *
 * This is <strong>NOT</strong> a doctrine repository but just the route
 * provider for the NestedMatcher. (you could of course implement this
 * interface in a repository class, if you need that)
 *
 * @author david.buchmann@liip.ch
 */
final class RouteProvider extends DoctrineProvider implements RouteProviderInterface
{
    private CandidatesInterface $candidatesStrategy;
    private LoggerInterface $logger;

    public function __construct(
        ManagerRegistry $managerRegistry,
        CandidatesInterface $candidatesStrategy,
        ?string $className = null,
        ?LoggerInterface $logger = null,
    ) {
        parent::__construct($managerRegistry, $className);
        $this->candidatesStrategy = $candidatesStrategy;
        $this->logger = $logger ?: new NullLogger();
    }

    /**
     * @return string[] a list of PHPCR-ODM ids
     */
    public function getCandidates(Request $request): array
    {
        $invalidCharacters = [':', '[', ']', '|', '*'];
        foreach ($invalidCharacters as $invalidCharacter) {
            if (str_contains($request->getPathInfo(), $invalidCharacter)) {
                return [];
            }
        }

        return $this->candidatesStrategy->getCandidates($request);
    }

    /**
     * {@inheritdoc}
     *
     * This will return any document found at the url or up the path to the
     * prefix. If any of the documents does not extend the symfony Route
     * object, it is filtered out. In the extreme case this can also lead to an
     * empty list being returned.
     */
    public function getRouteCollectionForRequest(Request $request): RouteCollection
    {
        $candidates = $this->getCandidates($request);

        $collection = new RouteCollection();

        if (0 === \count($candidates)) {
            return $collection;
        }

        try {
            $dm = $this->getObjectManager();
            $routes = $dm->findMany($this->className, $candidates);
            // filter for valid route objects
            foreach ($routes as $key => $route) {
                if ($route instanceof SymfonyRoute) {
                    $collection->add($key, $route);
                }
            }
        } catch (RepositoryException $e) {
            $this->logger->critical($e);
        }

        return $collection;
    }

    /**
     * @param string $name The absolute path or uuid of the Route document
     */
    public function getRouteByName(string $name): SymfonyRoute
    {
        if (UUIDHelper::isUUID($name)) {
            $route = $this->getObjectManager()->find($this->className, $name);
            if ($route
                && !$this->candidatesStrategy->isCandidate($this->getObjectManager()->getUnitOfWork()->getDocumentId($route))
            ) {
                throw new RouteNotFoundException(
                    sprintf(
                        'Route with uuid "%s" and id "%s" is not handled by this route provider',
                        $name,
                        $this->getObjectManager()->getUnitOfWork()->getDocumentId($route)
                    )
                );
            }
        } elseif (!$this->candidatesStrategy->isCandidate($name)) {
            throw new RouteNotFoundException(sprintf('Route name "%s" is not handled by this route provider', $name));
        } else {
            $route = $this->getObjectManager()->find($this->className, $name);
        }

        if (empty($route)) {
            throw new RouteNotFoundException(sprintf('No route found at "%s"', $name));
        }

        if (!$route instanceof SymfonyRoute) {
            throw new RouteNotFoundException(sprintf('Document at "%s" is no route', $name));
        }

        return $route;
    }

    /**
     * Get all the routes in the repository that are under one of the
     * configured prefixes. This respects the limit.
     *
     * @return SymfonyRoute[]
     */
    private function getAllRoutes(): iterable
    {
        if (0 === $this->routeCollectionLimit) {
            return [];
        }

        try {
            $dm = $this->getObjectManager();
        } catch (RepositoryException $e) {
            // special case: there is not even a database existing. this means there are no routes.
            if ($e->getPrevious() instanceof TableNotFoundException) {
                return [];
            }

            throw $e;
        }
        $qb = $dm->createQueryBuilder();

        $qb->from('d')->document(SymfonyRoute::class, 'd');

        $this->candidatesStrategy->restrictQuery($qb);

        $query = $qb->getQuery();
        if ($this->routeCollectionLimit) {
            $query->setMaxResults($this->routeCollectionLimit);
        }

        return $query->getResult();
    }

    public function getRoutesByNames(?array $names = null): iterable
    {
        if (null === $names) {
            return $this->getAllRoutes();
        }

        $candidates = [];
        foreach ($names as $key => $name) {
            if (UUIDHelper::isUUID($name) || $this->candidatesStrategy->isCandidate($name)) {
                $candidates[$key] = $name;
            }
        }

        if (!$candidates) {
            return [];
        }

        $dm = $this->getObjectManager();
        $documents = $dm->findMany($this->className, $candidates);
        foreach ($documents as $key => $document) {
            if (UUIDHelper::isUUID($key)
                && !$this->candidatesStrategy->isCandidate($this->getObjectManager()->getUnitOfWork()->getDocumentId($document))
            ) {
                // this uuid pointed out of our path. can only determine after fetching the document
                unset($documents[$key]);
            }
            if (!$document instanceof SymfonyRoute) {
                // we follow the logic of DocumentManager::findMany and do not throw an exception
                unset($documents[$key]);
            }
        }

        return $documents;
    }

    /**
     * Make sure the manager is a PHPCR-ODM manager.
     */
    protected function getObjectManager(): DocumentManagerInterface
    {
        $dm = parent::getObjectManager();
        if (!$dm instanceof DocumentManagerInterface) {
            throw new \LogicException(sprintf('Expected %s, got %s', DocumentManagerInterface::class, get_class($dm)));
        }

        return $dm;
    }
}
