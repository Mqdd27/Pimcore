<?php

/*
 * This file is part of the PrestaSitemapBundle package.
 *
 * (c) PrestaConcept <https://prestaconcept.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Presta\SitemapBundle\Event;

use Presta\SitemapBundle\Service\UrlContainerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Contracts\EventDispatcher\Event;

/**
 * Event called whenever a sitemap build is requested.
 *
 * Subscribe to this event if :
 *  - you want to register non-static routes
 */
class SitemapPopulateEvent extends Event
{
    /**
     * @var UrlContainerInterface
     */
    protected $urlContainer;

    /**
     * Allows creating EventListeners for particular sitemap sections, used when dumping
     * @var string|null
     */
    protected $section;

    /**
     * @var UrlGeneratorInterface
     */
    protected $urlGenerator;

    /**
     * @param UrlContainerInterface $urlContainer
     * @param string|null           $section
     * @param UrlGeneratorInterface $urlGenerator
     */
    public function __construct(
        UrlContainerInterface $urlContainer,
        UrlGeneratorInterface $urlGenerator,
        ?string $section = null
    ) {
        $this->urlContainer = $urlContainer;
        $this->section = $section;
        $this->urlGenerator = $urlGenerator;
    }

    /**
     * @return UrlContainerInterface
     */
    public function getUrlContainer(): UrlContainerInterface
    {
        return $this->urlContainer;
    }

    /**
     * Section to be processed, null means any
     *
     * @return null|string
     */
    public function getSection(): ?string
    {
        return $this->section;
    }

    public function getUrlGenerator(): UrlGeneratorInterface
    {
        return $this->urlGenerator;
    }
}
