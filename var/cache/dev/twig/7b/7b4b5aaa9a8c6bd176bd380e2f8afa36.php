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

/* @WebProfiler/Collector/events.html.twig */
class __TwigTemplate_be2502c0dcfbeddb7edcd82f6221c8d5 extends Template
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

        $this->blocks = [
            'menu' => [$this, 'block_menu'],
            'panel' => [$this, 'block_panel'],
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doGetParent(array $context): bool|string|Template|TemplateWrapper
    {
        // line 1
        return "@WebProfiler/Profiler/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@WebProfiler/Collector/events.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@WebProfiler/Collector/events.html.twig"));

        $this->parent = $this->loadTemplate("@WebProfiler/Profiler/layout.html.twig", "@WebProfiler/Collector/events.html.twig", 1);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 3
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_menu(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "menu"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "menu"));

        // line 4
        yield "<span class=\"label\">
    <span class=\"icon\">";
        // line 5
        yield Twig\Extension\CoreExtension::source($this->env, "@WebProfiler/Icon/event.svg");
        yield "</span>
    <strong>Events</strong>
</span>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 10
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_panel(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "panel"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "panel"));

        // line 11
        yield "    <h2>Dispatched Events</h2>

    <div class=\"sf-tabs\">
        ";
        // line 14
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 14, $this->source); })()), "data", [], "any", false, false, true, 14));
        foreach ($context['_seq'] as $context["dispatcherName"] => $context["dispatcherData"]) {
            // line 15
            yield "            <div class=\"tab\">
                <h3 class=\"tab-title\">";
            // line 16
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["dispatcherName"], 16, $this->source), "html", null, true);
            yield "</h3>
                <div class=\"tab-content\">
                    ";
            // line 18
            if (Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, $context["dispatcherData"], "called_listeners", [], "array", false, false, true, 18))) {
                // line 19
                yield "                        <div class=\"empty empty-panel\">
                            <p>No events have been recorded. Check that debugging is enabled in the kernel.</p>
                        </div>
                    ";
            } else {
                // line 23
                yield "                        <div class=\"sf-tabs\">
                            <div class=\"tab\">
                                <h3 class=\"tab-title\">Called Listeners <span class=\"badge\">";
                // line 25
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::length($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["dispatcherData"], "called_listeners", [], "array", false, false, true, 25), 25, $this->source)), "html", null, true);
                yield "</span></h3>

                                <div class=\"tab-content\">
                                    ";
                // line 28
                yield $this->getTemplateForMacro("macro_render_table", $context, 28, $this->getSourceContext())->macro_render_table(...[CoreExtension::getAttribute($this->env, $this->source, $context["dispatcherData"], "called_listeners", [], "array", false, false, true, 28)]);
                yield "
                                </div>
                            </div>

                            <div class=\"tab\">
                                <h3 class=\"tab-title\">Not Called Listeners <span class=\"badge\">";
                // line 33
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::length($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["dispatcherData"], "not_called_listeners", [], "array", false, false, true, 33), 33, $this->source)), "html", null, true);
                yield "</span></h3>
                                <div class=\"tab-content\">
                                    ";
                // line 35
                if (Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, $context["dispatcherData"], "not_called_listeners", [], "array", false, false, true, 35))) {
                    // line 36
                    yield "                                        <div class=\"empty\">
                                            <p>
                                                <strong>There are no uncalled listeners</strong>.
                                            </p>
                                            <p>
                                                All listeners were called or an error occurred
                                                when trying to collect uncalled listeners (in which case check the
                                                logs to get more information).
                                            </p>
                                        </div>
                                    ";
                } else {
                    // line 47
                    yield "                                        ";
                    yield $this->getTemplateForMacro("macro_render_table", $context, 47, $this->getSourceContext())->macro_render_table(...[CoreExtension::getAttribute($this->env, $this->source, $context["dispatcherData"], "not_called_listeners", [], "array", false, false, true, 47)]);
                    yield "
                                    ";
                }
                // line 49
                yield "                                </div>
                            </div>

                            <div class=\"tab\">
                                <h3 class=\"tab-title\">Orphaned Events <span class=\"badge\">";
                // line 53
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::length($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["dispatcherData"], "orphaned_events", [], "array", false, false, true, 53), 53, $this->source)), "html", null, true);
                yield "</span></h3>
                                <div class=\"tab-content\">
                                    ";
                // line 55
                if (Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, $context["dispatcherData"], "orphaned_events", [], "array", false, false, true, 55))) {
                    // line 56
                    yield "                                        <div class=\"empty\">
                                            <p>
                                                <strong>There are no orphaned events</strong>.
                                            </p>
                                            <p>
                                                All dispatched events were handled or an error occurred
                                                when trying to collect orphaned events (in which case check the
                                                logs to get more information).
                                            </p>
                                        </div>
                                    ";
                } else {
                    // line 67
                    yield "                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Event</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ";
                    // line 74
                    $context['_parent'] = $context;
                    $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["dispatcherData"], "orphaned_events", [], "array", false, false, true, 74));
                    foreach ($context['_seq'] as $context["_key"] => $context["event"]) {
                        // line 75
                        yield "                                                    <tr>
                                                        <td class=\"font-normal\">";
                        // line 76
                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["event"], 76, $this->source), "html", null, true);
                        yield "</td>
                                                    </tr>
                                                ";
                    }
                    $_parent = $context['_parent'];
                    unset($context['_seq'], $context['_key'], $context['event'], $context['_parent']);
                    $context = array_intersect_key($context, $_parent) + $_parent;
                    // line 79
                    yield "                                            </tbody>
                                        </table>
                                    ";
                }
                // line 82
                yield "                                </div>
                            </div>
                        </div>
                    ";
            }
            // line 86
            yield "                </div>
            </div>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['dispatcherName'], $context['dispatcherData'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 89
        yield "    </div>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 92
    public function macro_render_table($listeners = null, ...$varargs): string|Markup
    {
        $macros = $this->macros;
        $context = [
            "listeners" => $listeners,
            "varargs" => $varargs,
        ] + $this->env->getGlobals();

        $blocks = [];

        return ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
            $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "macro", "render_table"));

            $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
            $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "macro", "render_table"));

            // line 93
            yield "    <table>
        <thead>
            <tr>
                <th class=\"text-right\">Priority</th>
                <th>Listener</th>
            </tr>
        </thead>

        ";
            // line 101
            $context["previous_event"] = CoreExtension::getAttribute($this->env, $this->source, Twig\Extension\CoreExtension::first($this->env->getCharset(), $this->sandbox->ensureToStringAllowed((isset($context["listeners"]) || array_key_exists("listeners", $context) ? $context["listeners"] : (function () { throw new RuntimeError('Variable "listeners" does not exist.', 101, $this->source); })()), 101, $this->source)), "event", [], "any", false, false, true, 101);
            // line 102
            yield "        ";
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable((isset($context["listeners"]) || array_key_exists("listeners", $context) ? $context["listeners"] : (function () { throw new RuntimeError('Variable "listeners" does not exist.', 102, $this->source); })()));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["listener"]) {
                // line 103
                yield "            ";
                if ((CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "first", [], "any", false, false, true, 103) || (CoreExtension::getAttribute($this->env, $this->source, $context["listener"], "event", [], "any", false, false, true, 103) != (isset($context["previous_event"]) || array_key_exists("previous_event", $context) ? $context["previous_event"] : (function () { throw new RuntimeError('Variable "previous_event" does not exist.', 103, $this->source); })())))) {
                    // line 104
                    yield "                ";
                    if ( !CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "first", [], "any", false, false, true, 104)) {
                        // line 105
                        yield "                    </tbody>
                ";
                    }
                    // line 107
                    yield "
                <tbody>
                    <tr>
                        <th colspan=\"2\" class=\"colored font-normal\">";
                    // line 110
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["listener"], "event", [], "any", false, false, true, 110), 110, $this->source), "html", null, true);
                    yield "</th>
                    </tr>

                ";
                    // line 113
                    $context["previous_event"] = CoreExtension::getAttribute($this->env, $this->source, $context["listener"], "event", [], "any", false, false, true, 113);
                    // line 114
                    yield "            ";
                }
                // line 115
                yield "
            <tr>
                <td class=\"text-right nowrap\">";
                // line 117
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((CoreExtension::getAttribute($this->env, $this->source, $context["listener"], "priority", [], "any", true, true, true, 117)) ? (Twig\Extension\CoreExtension::default($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["listener"], "priority", [], "any", false, false, true, 117), 117, $this->source), "-")) : ("-")), "html", null, true);
                yield "</td>
                <td class=\"font-normal\">";
                // line 118
                yield $this->extensions['Symfony\Bundle\WebProfilerBundle\Twig\WebProfilerExtension']->dumpData($this->env, $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["listener"], "stub", [], "any", false, false, true, 118), 118, $this->source));
                yield "</td>
            </tr>

            ";
                // line 121
                if (CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "last", [], "any", false, false, true, 121)) {
                    // line 122
                    yield "                </tbody>
            ";
                }
                // line 124
                yield "        ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['revindex0'], $context['loop']['revindex'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_key'], $context['listener'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 125
            yield "    </table>
";
            
            $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

            
            $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "@WebProfiler/Collector/events.html.twig";
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
        return array (  369 => 125,  355 => 124,  351 => 122,  349 => 121,  343 => 118,  339 => 117,  335 => 115,  332 => 114,  330 => 113,  324 => 110,  319 => 107,  315 => 105,  312 => 104,  309 => 103,  291 => 102,  289 => 101,  279 => 93,  261 => 92,  249 => 89,  241 => 86,  235 => 82,  230 => 79,  221 => 76,  218 => 75,  214 => 74,  205 => 67,  192 => 56,  190 => 55,  185 => 53,  179 => 49,  173 => 47,  160 => 36,  158 => 35,  153 => 33,  145 => 28,  139 => 25,  135 => 23,  129 => 19,  127 => 18,  122 => 16,  119 => 15,  115 => 14,  110 => 11,  97 => 10,  82 => 5,  79 => 4,  66 => 3,  43 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% extends '@WebProfiler/Profiler/layout.html.twig' %}

{% block menu %}
<span class=\"label\">
    <span class=\"icon\">{{ source('@WebProfiler/Icon/event.svg') }}</span>
    <strong>Events</strong>
</span>
{% endblock %}

{% block panel %}
    <h2>Dispatched Events</h2>

    <div class=\"sf-tabs\">
        {% for dispatcherName, dispatcherData in collector.data %}
            <div class=\"tab\">
                <h3 class=\"tab-title\">{{ dispatcherName }}</h3>
                <div class=\"tab-content\">
                    {% if dispatcherData['called_listeners'] is empty %}
                        <div class=\"empty empty-panel\">
                            <p>No events have been recorded. Check that debugging is enabled in the kernel.</p>
                        </div>
                    {% else %}
                        <div class=\"sf-tabs\">
                            <div class=\"tab\">
                                <h3 class=\"tab-title\">Called Listeners <span class=\"badge\">{{ dispatcherData['called_listeners']|length }}</span></h3>

                                <div class=\"tab-content\">
                                    {{ _self.render_table(dispatcherData['called_listeners']) }}
                                </div>
                            </div>

                            <div class=\"tab\">
                                <h3 class=\"tab-title\">Not Called Listeners <span class=\"badge\">{{ dispatcherData['not_called_listeners']|length }}</span></h3>
                                <div class=\"tab-content\">
                                    {% if dispatcherData['not_called_listeners'] is empty %}
                                        <div class=\"empty\">
                                            <p>
                                                <strong>There are no uncalled listeners</strong>.
                                            </p>
                                            <p>
                                                All listeners were called or an error occurred
                                                when trying to collect uncalled listeners (in which case check the
                                                logs to get more information).
                                            </p>
                                        </div>
                                    {% else %}
                                        {{ _self.render_table(dispatcherData['not_called_listeners']) }}
                                    {% endif %}
                                </div>
                            </div>

                            <div class=\"tab\">
                                <h3 class=\"tab-title\">Orphaned Events <span class=\"badge\">{{ dispatcherData['orphaned_events']|length }}</span></h3>
                                <div class=\"tab-content\">
                                    {% if dispatcherData['orphaned_events'] is empty %}
                                        <div class=\"empty\">
                                            <p>
                                                <strong>There are no orphaned events</strong>.
                                            </p>
                                            <p>
                                                All dispatched events were handled or an error occurred
                                                when trying to collect orphaned events (in which case check the
                                                logs to get more information).
                                            </p>
                                        </div>
                                    {% else %}
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Event</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {% for event in dispatcherData['orphaned_events'] %}
                                                    <tr>
                                                        <td class=\"font-normal\">{{ event }}</td>
                                                    </tr>
                                                {% endfor %}
                                            </tbody>
                                        </table>
                                    {% endif %}
                                </div>
                            </div>
                        </div>
                    {% endif %}
                </div>
            </div>
        {% endfor %}
    </div>
{% endblock %}

{% macro render_table(listeners) %}
    <table>
        <thead>
            <tr>
                <th class=\"text-right\">Priority</th>
                <th>Listener</th>
            </tr>
        </thead>

        {% set previous_event = (listeners|first).event %}
        {% for listener in listeners %}
            {% if loop.first or listener.event != previous_event %}
                {% if not loop.first %}
                    </tbody>
                {% endif %}

                <tbody>
                    <tr>
                        <th colspan=\"2\" class=\"colored font-normal\">{{ listener.event }}</th>
                    </tr>

                {% set previous_event = listener.event %}
            {% endif %}

            <tr>
                <td class=\"text-right nowrap\">{{ listener.priority|default('-') }}</td>
                <td class=\"font-normal\">{{ profiler_dump(listener.stub) }}</td>
            </tr>

            {% if loop.last %}
                </tbody>
            {% endif %}
        {% endfor %}
    </table>
{% endmacro %}
", "@WebProfiler/Collector/events.html.twig", "/var/www/pimcore/vendor/symfony/web-profiler-bundle/Resources/views/Collector/events.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["extends" => 1, "macro" => 92, "for" => 14, "if" => 18, "set" => 101];
        static $filters = ["escape" => 16, "length" => 25, "first" => 101, "default" => 117];
        static $functions = ["source" => 5, "profiler_dump" => 118];

        try {
            $this->sandbox->checkSecurity(
                ['extends', 'macro', 'for', 'if', 'set'],
                ['escape', 'length', 'first', 'default'],
                ['source', 'profiler_dump'],
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
