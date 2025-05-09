<?php

/*
 * This file is part of the Symfony CMF package.
 *
 * (c) Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Cmf\Bundle\RoutingBundle;

use Doctrine\Bundle\DoctrineBundle\DependencyInjection\Compiler\DoctrineOrmMappingsPass;
use Doctrine\Bundle\PHPCRBundle\DependencyInjection\Compiler\DoctrinePhpcrMappingsPass;
use Doctrine\Common\Persistence\PersistentObject;
use Doctrine\ODM\PHPCR\Mapping\Driver\XmlDriver as PHPCRXmlDriver;
use Doctrine\ODM\PHPCR\Version as PHPCRVersion;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Driver\XmlDriver as ORMXmlDriver;
use Doctrine\Persistence\Mapping\Driver\DefaultFileLocator;
use Symfony\Cmf\Bundle\RoutingBundle\DependencyInjection\Compiler\RedirectableMatcherPass;
use Symfony\Cmf\Bundle\RoutingBundle\DependencyInjection\Compiler\SetRouterPass;
use Symfony\Cmf\Bundle\RoutingBundle\DependencyInjection\Compiler\ValidationPass;
use Symfony\Cmf\Component\Routing\DependencyInjection\Compiler\RegisterRouteEnhancersPass;
use Symfony\Cmf\Component\Routing\DependencyInjection\Compiler\RegisterRoutersPass;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\HttpKernel\Bundle\Bundle;

final class CmfRoutingBundle extends Bundle
{
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);
        $container->addCompilerPass(new RegisterRoutersPass());
        $container->addCompilerPass(new RegisterRouteEnhancersPass());
        $container->addCompilerPass(new SetRouterPass());
        $container->addCompilerPass(new ValidationPass());
        $container->addCompilerPass(new RedirectableMatcherPass());

        $this->buildPhpcrCompilerPass($container);
        $this->buildOrmCompilerPass($container);
    }

    /**
     * Creates and registers compiler passes for PHPCR-ODM mapping if both the
     * phpcr-odm and the phpcr-bundle are present.
     */
    private function buildPhpcrCompilerPass(ContainerBuilder $container): void
    {
        if (!class_exists(PHPCRVersion::class)) {
            return;
        }

        $container->addCompilerPass(
            $this->buildBaseCompilerPass(DoctrinePhpcrMappingsPass::class, PHPCRXmlDriver::class, 'phpcr')
        );
        $aliasMap = [];
        // short alias is no longer supported in doctrine/persistence 3, but keep aliasing for BC with old installations
        if (class_exists(PersistentObject::class)) {
            $aliasMap = ['CmfRoutingBundle' => 'Symfony\Cmf\Bundle\RoutingBundle\Doctrine\Phpcr'];
        }
        $container->addCompilerPass(
            /* @phpstan-ignore arguments.count (support for doctrine/persistence 2) */
            DoctrinePhpcrMappingsPass::createXmlMappingDriver(
                [
                    realpath(__DIR__.'/Resources/config/doctrine-model') => 'Symfony\Cmf\Bundle\RoutingBundle\Model',
                    realpath(__DIR__.'/Resources/config/doctrine-phpcr') => 'Symfony\Cmf\Bundle\RoutingBundle\Doctrine\Phpcr',
                ],
                ['cmf_routing.dynamic.persistence.phpcr.manager_name'],
                'cmf_routing.backend_type_phpcr',
                $aliasMap
            )
        );
    }

    /**
     * Creates and registers compiler passes for ORM mappings if doctrine ORM is available.
     */
    private function buildOrmCompilerPass(ContainerBuilder $container): void
    {
        if (!interface_exists(EntityManagerInterface::class)) {
            return;
        }

        $container->addCompilerPass(
            $this->buildBaseCompilerPass(DoctrineOrmMappingsPass::class, ORMXmlDriver::class, 'orm')
        );
        $aliasMap = [];
        // short alias is no longer supported in doctrine/persistence 3, but keep aliasing for BC with old installations
        if (class_exists(PersistentObject::class)) {
            $aliasMap = ['CmfRoutingBundle' => 'Symfony\Cmf\Bundle\RoutingBundle\Doctrine\Orm'];
        }
        $container->addCompilerPass(
            DoctrineOrmMappingsPass::createXmlMappingDriver(
                [
                    realpath(__DIR__.'/Resources/config/doctrine-model') => 'Symfony\Cmf\Bundle\RoutingBundle\Model',
                    realpath(__DIR__.'/Resources/config/doctrine-orm') => 'Symfony\Cmf\Bundle\RoutingBundle\Doctrine\Orm',
                ],
                ['cmf_routing.dynamic.persistence.orm.manager_name'],
                'cmf_routing.backend_type_orm_default',
                $aliasMap
            )
        );

        $container->addCompilerPass(
            DoctrineOrmMappingsPass::createXmlMappingDriver(
                [
                    realpath(__DIR__.'/Resources/config/doctrine-model') => 'Symfony\Cmf\Bundle\RoutingBundle\Model',
                ],
                ['cmf_routing.dynamic.persistence.orm.manager_name'],
                'cmf_routing.backend_type_orm_custom',
                []
            )
        );
    }

    /**
     * Builds the compiler pass for the symfony core routing component. The
     * compiler pass factory method uses the SymfonyFileLocator which does
     * magic with the namespace and thus does not work here.
     */
    private function buildBaseCompilerPass(string $compilerClass, string $driverClass, string $type): CompilerPassInterface
    {
        $arguments = [[realpath(__DIR__.'/Resources/config/doctrine-base')], sprintf('.%s.xml', $type)];
        $locator = new Definition(DefaultFileLocator::class, $arguments);
        $driver = new Definition($driverClass, [$locator]);

        return new $compilerClass(
            $driver,
            ['Symfony\Component\Routing'],
            [sprintf('cmf_routing.dynamic.persistence.%s.manager_name', $type)],
            sprintf('cmf_routing.backend_type_%s', $type)
        );
    }
}
