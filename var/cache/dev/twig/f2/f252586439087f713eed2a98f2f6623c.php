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

/* @PimcoreAdmin/searchadmin/search/quicksearch/document.html.twig */
class __TwigTemplate_e6d3e9e70cd883671b1933e4ad08d60b extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/searchadmin/search/quicksearch/document.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/searchadmin/search/quicksearch/document.html.twig"));

        // line 2
        $context["previewImage"] = null;
        // line 3
        if (($this->env->getTest('instanceof')->getCallable()((isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 3, $this->source); })()), "\\Pimcore\\Model\\Document\\Page") && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["config"]) || array_key_exists("config", $context) ? $context["config"] : (function () { throw new RuntimeError('Variable "config" does not exist.', 3, $this->source); })()), "documents", [], "array", false, false, true, 3), "generate_preview", [], "array", false, false, true, 3) == true))) {
            // line 4
            yield "    ";
            $context["thumbnailFile"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 4, $this->source); })()), "getPreviewImageFilesystemPath", [], "method", false, false, true, 4);
            // line 5
            yield "    ";
            if ($this->env->getFunction('pimcore_file_exists')->getCallable()((isset($context["thumbnailFile"]) || array_key_exists("thumbnailFile", $context) ? $context["thumbnailFile"] : (function () { throw new RuntimeError('Variable "thumbnailFile" does not exist.', 5, $this->source); })()))) {
                // line 6
                yield "        ";
                $context["previewImage"] = $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_page_display_preview_image", ["id" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 6, $this->source); })()), "id", [], "any", false, false, true, 6), 6, $this->source)]);
                // line 7
                yield "    ";
            }
        }
        // line 9
        yield "
";
        // line 10
        if (((isset($context["previewImage"]) || array_key_exists("previewImage", $context) ? $context["previewImage"] : (function () { throw new RuntimeError('Variable "previewImage" does not exist.', 10, $this->source); })()) != null)) {
            // line 11
            yield "    <div class=\"full-preview\">
        <img src=\"";
            // line 12
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["previewImage"]) || array_key_exists("previewImage", $context) ? $context["previewImage"] : (function () { throw new RuntimeError('Variable "previewImage" does not exist.', 12, $this->source); })()), 12, $this->source), "html", null, true);
            yield "\" onload=\"this.parentNode.className += ' complete';\">
        ";
            // line 13
            yield from $this->loadTemplate("@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig", "@PimcoreAdmin/searchadmin/search/quicksearch/document.html.twig", 13)->unwrap()->yield(CoreExtension::merge($context, ["element" => (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 13, $this->source); })())]));
            // line 14
            yield "    </div>
";
        } else {
            // line 16
            yield "    <div class=\"mega-icon ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["iconCls"]) || array_key_exists("iconCls", $context) ? $context["iconCls"] : (function () { throw new RuntimeError('Variable "iconCls" does not exist.', 16, $this->source); })()), 16, $this->source), "html", null, true);
            yield "\"></div>
    ";
            // line 17
            yield from $this->loadTemplate("@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig", "@PimcoreAdmin/searchadmin/search/quicksearch/document.html.twig", 17)->unwrap()->yield(CoreExtension::merge($context, ["element" => (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 17, $this->source); })())]));
        }
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "@PimcoreAdmin/searchadmin/search/quicksearch/document.html.twig";
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
        return array (  90 => 17,  85 => 16,  81 => 14,  79 => 13,  75 => 12,  72 => 11,  70 => 10,  67 => 9,  63 => 7,  60 => 6,  57 => 5,  54 => 4,  52 => 3,  50 => 2,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{# @var \$element \\Pimcore\\Model\\Document\\Page #}
{% set previewImage = null %}
{% if element is instanceof('\\\\Pimcore\\\\Model\\\\Document\\\\Page') and config['documents']['generate_preview'] == true %}
    {% set thumbnailFile = element.getPreviewImageFilesystemPath() %}
    {% if pimcore_file_exists(thumbnailFile) %}
        {% set previewImage = path('pimcore_admin_page_display_preview_image', {'id': element.id }) %}
    {% endif %}
{% endif %}

{% if previewImage != null %}
    <div class=\"full-preview\">
        <img src=\"{{ previewImage }}\" onload=\"this.parentNode.className += ' complete';\">
        {% include '@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig' with {'element': element} %}
    </div>
{% else %}
    <div class=\"mega-icon {{ iconCls }}\"></div>
    {% include '@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig' with {'element': element} %}
{% endif %}
", "@PimcoreAdmin/searchadmin/search/quicksearch/document.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/searchadmin/search/quicksearch/document.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 2, "if" => 3, "include" => 13];
        static $filters = ["escape" => 12];
        static $functions = ["pimcore_file_exists" => 5, "path" => 6];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'include'],
                ['escape'],
                ['pimcore_file_exists', 'path'],
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
