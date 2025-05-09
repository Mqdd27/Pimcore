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

use Doctrine\ODM\PHPCR\DocumentManager;
use Doctrine\ODM\PHPCR\Event\MoveEventArgs;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Cmf\Bundle\RoutingBundle\Model\Route as ModelRoute;

/**
 * Doctrine PHPCR-ODM listener to update the locale on routes based on the URL.
 *
 * It uses the idPrefix and looks at the path segment right after the prefix to
 * determine if that segment matches one of the configured locales and if so
 * sets a requirement and default named _locale for that locale.
 *
 * @author David Buchmann <mail@davidbu.ch>
 */
final class LocaleListener
{
    /**
     * Used to ask for the possible prefixes to determine the possible locale
     * segment of the id.
     */
    private PrefixCandidates $candidates;

    /**
     * List of possible locales to detect on URL after idPrefix.
     *
     * @var string[]
     */
    private array $locales;

    /**
     * Whether to enforce the route option add_locale_pattern.
     */
    private bool $addLocalePattern;

    /**
     * Whether to update the _locales requirement based on available
     * translations of the document.
     *
     * This is only done for routes that are translated documents at the same
     * time, and only if their path does not start with one of the available
     * locales. An example are the CmfSimpleCmsBundle Page documents.
     */
    private bool $updateAvailableTranslations;

    /**
     * This listener is built to work with the prefix candidates strategy.
     *
     * @param string[] $locales                     Locales that should be detected
     * @param bool     $addLocalePattern            Whether to enforce the add_locale_pattern
     *                                              option if the route does not have one of
     *                                              the allowed locales in its id
     * @param bool     $updateAvailableTranslations Whether to update the route document with
     *                                              its available translations if it does not
     *                                              have one of the allowed locales in its id
     */
    public function __construct(
        PrefixCandidates $candidates,
        array $locales,
        bool $addLocalePattern = false,
        bool $updateAvailableTranslations = false,
    ) {
        $this->candidates = $candidates;
        $this->locales = $locales;
        $this->setAddLocalePattern($addLocalePattern);
        $this->setUpdateAvailableTranslations($updateAvailableTranslations);
    }

    /**
     * Specify the list of allowed locales.
     */
    public function setLocales(array $locales): void
    {
        $this->locales = $locales;
    }

    /**
     * Whether to make the route prepend the locale pattern if it does not
     * have one of the allowed locales in its id.
     */
    public function setAddLocalePattern(bool $addLocalePattern): void
    {
        $this->addLocalePattern = $addLocalePattern;
    }

    public function setUpdateAvailableTranslations(bool $update): void
    {
        $this->updateAvailableTranslations = $update;
    }

    /**
     * Update locale after loading a route.
     */
    public function postLoad(LifecycleEventArgs $args): void
    {
        $doc = $args->getObject();
        if (!$doc instanceof ModelRoute) {
            return;
        }
        $this->updateLocale($doc, $doc->getId(), $args->getObjectManager());
    }

    /**
     * Update locale after persisting a route.
     */
    public function postPersist(LifecycleEventArgs $args): void
    {
        $doc = $args->getObject();
        if (!$doc instanceof ModelRoute) {
            return;
        }
        $this->updateLocale($doc, $doc->getId(), $args->getObjectManager());
    }

    /**
     * Update a locale after the route has been moved.
     */
    public function postMove(MoveEventArgs $args): void
    {
        $doc = $args->getObject();
        if (!$doc instanceof ModelRoute) {
            return;
        }
        $this->updateLocale($doc, $args->getTargetPath(), $args->getObjectManager(), true);
    }

    private function getPrefixes(): array
    {
        return $this->candidates->getPrefixes();
    }

    /**
     * Update the locale of a route if $id starts with the prefix and has a
     * valid locale right after.
     *
     * @param string          $id    The id (in move case, this is not the current id of $route)
     * @param DocumentManager $dm    The document manager to get locales from, if the
     *                               setAvailableTranslations option is enabled
     * @param bool            $force Whether to update the locale even if the route already has a locale
     */
    private function updateLocale(ModelRoute $doc, string $id, DocumentManager $dm, bool $force = false): void
    {
        $matches = [];

        // only update if the prefix matches, to allow for more than one
        // listener and more than one route root.
        if (!preg_match('#('.implode('|', $this->getPrefixes()).')/([^/]+)(/|$)#', $id, $matches)) {
            return;
        }

        if (\in_array($locale = $matches[2], $this->locales, true)) {
            if ($force || !$doc->getDefault('_locale')) {
                $doc->setDefault('_locale', $locale);
            }
            if ($force || !$doc->getRequirement('_locale')) {
                $doc->setRequirement('_locale', $locale);
            }
        } else {
            if ($this->addLocalePattern) {
                $doc->setOption('add_locale_pattern', true);
            }
            if ($this->updateAvailableTranslations
                && $dm->isDocumentTranslatable($doc)
                && !$doc->getRequirement('_locale')
            ) {
                $locales = $dm->getLocalesFor($doc, true);
                $doc->setRequirement('_locale', implode('|', $locales));
            }
        }
    }
}
