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

/* @PimcoreCore/Profiler/key_value_table.html.twig */
class __TwigTemplate_19c79284d8683a737b42e49ef7918bf1 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreCore/Profiler/key_value_table.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreCore/Profiler/key_value_table.html.twig"));

        // line 1
        trigger_deprecation('', '', "The \"key_value_table.html.twig\" is moved to the personalization bundle and will be removed in pimcore/pimcore 12."." in \"@PimcoreCore/Profiler/key_value_table.html.twig\" at line 1.");
        // line 2
        yield "
<table class=\"";
        // line 3
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((array_key_exists("class", $context)) ? (Twig\Extension\CoreExtension::default($this->sandbox->ensureToStringAllowed((isset($context["class"]) || array_key_exists("class", $context) ? $context["class"] : (function () { throw new RuntimeError('Variable "class" does not exist.', 3, $this->source); })()), 3, $this->source), "")) : ("")), "html", null, true);
        yield "\">
    <thead>
    <tr>
        <th scope=\"col\" class=\"key\">";
        // line 6
        yield ((array_key_exists("labels", $context)) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["labels"]) || array_key_exists("labels", $context) ? $context["labels"] : (function () { throw new RuntimeError('Variable "labels" does not exist.', 6, $this->source); })()), 0, [], "array", false, false, true, 6), 6, $this->source), "html", null, true)) : ("Key"));
        yield "</th>
        <th scope=\"col\">";
        // line 7
        yield ((array_key_exists("labels", $context)) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["labels"]) || array_key_exists("labels", $context) ? $context["labels"] : (function () { throw new RuntimeError('Variable "labels" does not exist.', 7, $this->source); })()), 1, [], "array", false, false, true, 7), 7, $this->source), "html", null, true)) : ("Value"));
        yield "</th>
    </tr>
    </thead>
    <tbody>
    ";
        // line 11
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(Twig\Extension\CoreExtension::keys((isset($context["data"]) || array_key_exists("data", $context) ? $context["data"] : (function () { throw new RuntimeError('Variable "data" does not exist.', 11, $this->source); })())));
        $context['_iterated'] = false;
        foreach ($context['_seq'] as $context["_key"] => $context["key"]) {
            // line 12
            yield "        <tr>
            <th>";
            // line 13
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["key"], 13, $this->source), "html", null, true);
            yield "</th>
            <td>";
            // line 14
            yield $this->extensions['Symfony\Bundle\WebProfilerBundle\Twig\WebProfilerExtension']->dumpData($this->env, $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["data"]) || array_key_exists("data", $context) ? $context["data"] : (function () { throw new RuntimeError('Variable "data" does not exist.', 14, $this->source); })()), $context["key"], [], "array", false, false, true, 14), 14, $this->source), ((array_key_exists("maxDepth", $context)) ? (Twig\Extension\CoreExtension::default($this->sandbox->ensureToStringAllowed((isset($context["maxDepth"]) || array_key_exists("maxDepth", $context) ? $context["maxDepth"] : (function () { throw new RuntimeError('Variable "maxDepth" does not exist.', 14, $this->source); })()), 14, $this->source), 0)) : (0)));
            yield "</td>
        </tr>
    ";
            $context['_iterated'] = true;
        }
        // line 16
        if (!$context['_iterated']) {
            // line 17
            yield "        <tr>
            <td colspan=\"2\">(no data)</td>
        </tr>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['key'], $context['_parent'], $context['_iterated']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 21
        yield "    </tbody>
</table>
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
        return "@PimcoreCore/Profiler/key_value_table.html.twig";
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
        return array (  102 => 21,  93 => 17,  91 => 16,  84 => 14,  80 => 13,  77 => 12,  72 => 11,  65 => 7,  61 => 6,  55 => 3,  52 => 2,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% deprecated 'The \"key_value_table.html.twig\" is moved to the personalization bundle and will be removed in pimcore/pimcore 12.' %}

<table class=\"{{ class|default('') }}\">
    <thead>
    <tr>
        <th scope=\"col\" class=\"key\">{{ labels is defined ? labels[0] : 'Key' }}</th>
        <th scope=\"col\">{{ labels is defined ? labels[1] : 'Value' }}</th>
    </tr>
    </thead>
    <tbody>
    {% for key in data|keys %}
        <tr>
            <th>{{ key }}</th>
            <td>{{ profiler_dump(data[key], maxDepth=maxDepth|default(0)) }}</td>
        </tr>
    {% else %}
        <tr>
            <td colspan=\"2\">(no data)</td>
        </tr>
    {% endfor %}
    </tbody>
</table>
", "@PimcoreCore/Profiler/key_value_table.html.twig", "/var/www/pimcore/vendor/pimcore/pimcore/bundles/CoreBundle/templates/Profiler/key_value_table.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["deprecated" => 1, "for" => 11];
        static $filters = ["escape" => 3, "default" => 3, "keys" => 11];
        static $functions = ["profiler_dump" => 14];

        try {
            $this->sandbox->checkSecurity(
                ['deprecated', 'for'],
                ['escape', 'default', 'keys'],
                ['profiler_dump'],
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
