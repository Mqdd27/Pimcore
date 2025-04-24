<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* @PimcoreAdmin/searchadmin/search/quicksearch/asset.html.twig */
class __TwigTemplate_608df2cbc7ced3034b9f3ba858c03c7b extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/searchadmin/search/quicksearch/asset.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/searchadmin/search/quicksearch/asset.html.twig"));

        // line 2
        $context["previewImage"] = null;
        // line 3
        $context["params"] = ["id" => CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 3, $this->source); })()), "id", [], "any", false, false, true, 3), "treepreview" => true];
        // line 4
        yield "
";
        // line 5
        if ($this->env->getTest('instanceof')->getCallable()((isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 5, $this->source); })()), "\\Pimcore\\Model\\Asset\\Image")) {
            // line 6
            yield "    ";
            $context["previewImage"] = $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_asset_getimagethumbnail", $this->sandbox->ensureToStringAllowed((isset($context["params"]) || array_key_exists("params", $context) ? $context["params"] : (function () { throw new RuntimeError('Variable "params" does not exist.', 6, $this->source); })()), 6, $this->source));
        } elseif (($this->env->getTest('instanceof')->getCallable()(        // line 7
(isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 7, $this->source); })()), "\\Pimcore\\Model\\Asset\\Video") && Pimcore\Video::isAvailable())) {
            // line 8
            yield "    ";
            $context["previewImage"] = $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_asset_getvideothumbnail", $this->sandbox->ensureToStringAllowed((isset($context["params"]) || array_key_exists("params", $context) ? $context["params"] : (function () { throw new RuntimeError('Variable "params" does not exist.', 8, $this->source); })()), 8, $this->source));
        } elseif (($this->env->getTest('instanceof')->getCallable()(        // line 9
(isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 9, $this->source); })()), "\\Pimcore\\Model\\Asset\\Document") && Pimcore\Document::isAvailable())) {
            // line 10
            yield "    ";
            $context["previewImage"] = $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_asset_getdocumentthumbnail", $this->sandbox->ensureToStringAllowed((isset($context["params"]) || array_key_exists("params", $context) ? $context["params"] : (function () { throw new RuntimeError('Variable "params" does not exist.', 10, $this->source); })()), 10, $this->source));
        }
        // line 12
        yield "
";
        // line 13
        if (array_key_exists("previewImage", $context)) {
            // line 14
            yield "    <div class=\"full-preview\">
        <img src=\"";
            // line 15
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["previewImage"]) || array_key_exists("previewImage", $context) ? $context["previewImage"] : (function () { throw new RuntimeError('Variable "previewImage" does not exist.', 15, $this->source); })()), 15, $this->source), "html", null, true);
            yield "\" onload=\"this.parentNode.className += ' complete';\">
        ";
            // line 16
            yield from $this->loadTemplate("@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig", "@PimcoreAdmin/searchadmin/search/quicksearch/asset.html.twig", 16)->unwrap()->yield(CoreExtension::merge($context, ["element" => (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 16, $this->source); })())]));
            // line 17
            yield "    </div>
";
        } else {
            // line 19
            yield "    <div class=\"mega-icon ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["iconCls"]) || array_key_exists("iconCls", $context) ? $context["iconCls"] : (function () { throw new RuntimeError('Variable "iconCls" does not exist.', 19, $this->source); })()), 19, $this->source), "html", null, true);
            yield "\"></div>
    ";
            // line 20
            yield from $this->loadTemplate("@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig", "@PimcoreAdmin/searchadmin/search/quicksearch/asset.html.twig", 20)->unwrap()->yield(CoreExtension::merge($context, ["element" => (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 20, $this->source); })())]));
        }
        // line 22
        yield "
";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "@PimcoreAdmin/searchadmin/search/quicksearch/asset.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  99 => 22,  96 => 20,  91 => 19,  87 => 17,  85 => 16,  81 => 15,  78 => 14,  76 => 13,  73 => 12,  69 => 10,  67 => 9,  64 => 8,  62 => 7,  59 => 6,  57 => 5,  54 => 4,  52 => 3,  50 => 2,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{# @var \$element \\Pimcore\\Model\\Asset\\Image|\\Pimcore\\Model\\Asset\\Document|\\Pimcore\\Model\\Asset\\Video #}
{% set previewImage = null %}
{% set params = { 'id': element.id, 'treepreview': true } %}

{% if element is instanceof('\\\\Pimcore\\\\Model\\\\Asset\\\\Image') %}
    {% set previewImage = path('pimcore_admin_asset_getimagethumbnail', params) %}
{% elseif element is instanceof('\\\\Pimcore\\\\Model\\\\Asset\\\\Video') and pimcore_video_is_available() %}
    {% set previewImage = path('pimcore_admin_asset_getvideothumbnail', params) %}
{% elseif element is instanceof('\\\\Pimcore\\\\Model\\\\Asset\\\\Document') and pimcore_document_is_available() %}
    {% set previewImage = path('pimcore_admin_asset_getdocumentthumbnail', params) %}
{% endif %}

{% if previewImage is defined %}
    <div class=\"full-preview\">
        <img src=\"{{ previewImage }}\" onload=\"this.parentNode.className += ' complete';\">
        {% include '@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig' with {'element': element} %}
    </div>
{% else %}
    <div class=\"mega-icon {{ iconCls }}\"></div>
    {% include '@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig' with {'element': element} %}
{% endif %}

", "@PimcoreAdmin/searchadmin/search/quicksearch/asset.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/searchadmin/search/quicksearch/asset.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 2, "if" => 5, "include" => 16];
        static $filters = ["escape" => 15];
        static $functions = ["path" => 6, "pimcore_video_is_available" => 7, "pimcore_document_is_available" => 9];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'include'],
                ['escape'],
                ['path', 'pimcore_video_is_available', 'pimcore_document_is_available'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
