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

/* @PimcoreCore/Workflow/statusinfo/toolbarStatusInfo.html.twig */
class __TwigTemplate_1b22e1f303dd8f92d197a2974de71dfa extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreCore/Workflow/statusinfo/toolbarStatusInfo.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreCore/Workflow/statusinfo/toolbarStatusInfo.html.twig"));

        // line 3
        if ( !array_key_exists("lang", $context)) {
            // line 4
            yield "    ";
            $context["lang"] = "en";
        }
        // line 6
        yield "
<div class=\"pimcore-workflow-place-indicator-wrapper\">
    ";
        // line 8
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["places"]) || array_key_exists("places", $context) ? $context["places"] : (function () { throw new RuntimeError('Variable "places" does not exist.', 8, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["place"]) {
            // line 9
            yield "
        <div class=\"pimcore-workflow-place-indicator\" style=\"background-color: ";
            // line 10
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["place"], "backgroundColor", [], "any", false, false, true, 10), 10, $this->source), "html", null, true);
            yield "; color:";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["place"], "fontColor", [], "any", false, false, true, 10), 10, $this->source), "html", null, true);
            yield "; border: 1px solid ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["place"], "borderColor", [], "any", false, false, true, 10), 10, $this->source), "html", null, true);
            yield ";\"  title=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["translator"]) || array_key_exists("translator", $context) ? $context["translator"] : (function () { throw new RuntimeError('Variable "translator" does not exist.', 10, $this->source); })()), "trans", [CoreExtension::getAttribute($this->env, $this->source, $context["place"], "title", [], "any", false, false, true, 10), [], "admin", (isset($context["lang"]) || array_key_exists("lang", $context) ? $context["lang"] : (function () { throw new RuntimeError('Variable "lang" does not exist.', 10, $this->source); })())], "method", false, false, true, 10), 10, $this->source), "html", null, true);
            yield "\">
            ";
            // line 11
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["translator"]) || array_key_exists("translator", $context) ? $context["translator"] : (function () { throw new RuntimeError('Variable "translator" does not exist.', 11, $this->source); })()), "trans", [CoreExtension::getAttribute($this->env, $this->source, $context["place"], "label", [], "any", false, false, true, 11), [], "admin", (isset($context["lang"]) || array_key_exists("lang", $context) ? $context["lang"] : (function () { throw new RuntimeError('Variable "lang" does not exist.', 11, $this->source); })())], "method", false, false, true, 11), 11, $this->source), "html", null, true);
            yield "
        </div>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['place'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 14
        yield "</div>";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "@PimcoreCore/Workflow/statusinfo/toolbarStatusInfo.html.twig";
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
        return array (  86 => 14,  77 => 11,  67 => 10,  64 => 9,  60 => 8,  56 => 6,  52 => 4,  50 => 3,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{# @var places \\Pimcore\\Workflow\\Place\\PlaceConfig[] #}
{# @var translator \\Symfony\\Contracts\\Translation\\TranslatorInterface #}
{% if lang is not defined %}
    {% set lang = 'en' %}
{% endif %}

<div class=\"pimcore-workflow-place-indicator-wrapper\">
    {% for place in places %}

        <div class=\"pimcore-workflow-place-indicator\" style=\"background-color: {{ place.backgroundColor }}; color:{{ place.fontColor }}; border: 1px solid {{ place.borderColor }};\"  title=\"{{ translator.trans(place.title,[],'admin',lang) }}\">
            {{ translator.trans(place.label,[],'admin',lang) }}
        </div>
    {% endfor %}
</div>", "@PimcoreCore/Workflow/statusinfo/toolbarStatusInfo.html.twig", "/var/www/pimcore/vendor/pimcore/pimcore/bundles/CoreBundle/templates/Workflow/statusinfo/toolbarStatusInfo.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["if" => 3, "set" => 4, "for" => 8];
        static $filters = ["escape" => 10];
        static $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set', 'for'],
                ['escape'],
                [],
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
