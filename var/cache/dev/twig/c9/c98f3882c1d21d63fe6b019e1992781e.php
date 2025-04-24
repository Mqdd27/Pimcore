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

/* @WebProfiler/Collector/workflow.html.twig */
class __TwigTemplate_f53c1365be894f0f8a7acda13a747ace extends Template
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
            'stylesheets' => [$this, 'block_stylesheets'],
            'toolbar' => [$this, 'block_toolbar'],
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@WebProfiler/Collector/workflow.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@WebProfiler/Collector/workflow.html.twig"));

        $this->parent = $this->loadTemplate("@WebProfiler/Profiler/layout.html.twig", "@WebProfiler/Collector/workflow.html.twig", 1);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 3
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_stylesheets(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        // line 4
        yield "    ";
        yield from $this->yieldParentBlock("stylesheets", $context, $blocks);
        yield "
    <style>
        dialog {
            border: none;
            border-radius: 6px;
            box-shadow: var(--settings-modal-shadow);
            max-width: 94%;
            width: 1200px;
        }

        dialog::backdrop {
            background: linear-gradient(
                45deg,
                rgb(18, 18, 20, 0.4),
                rgb(17, 17, 20, 0.8)
            );
        }

        dialog[open] {
            animation: scale 0.3s ease normal;
        }

        dialog[open]::backdrop {
            animation: backdrop 0.3s ease normal;
        }

        dialog.hide {
            animation-direction: reverse;
        }

        dialog h2 {
            margin-top: 0.2em
        }

        dialog i.cancel {
            cursor: pointer;
            padding: 0 5px;
            float: right;
        }

        dialog table {
            border: 1px solid #ccc;
            border-collapse: collapse;
            margin: 0 0 1em 0;
            margin-bottom: 1em;
            padding: 0;
            table-layout: fixed;
        }

        dialog table tr {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            padding: .35em;
        }

        dialog table th,
        dialog table td {
            padding: .625em;
            text-align: center;
            word-wrap: break-word;
        }

        dialog table th {
            font-size: .85em;
            letter-spacing: .1em;
            text-transform: uppercase;
        }

        dialog menu {
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            flex-direction: row;
            vertical-align: middle;
            justify-content: center;
        }

        dialog menu small {
            margin-right: auto;
        }
        dialog menu small i {
            margin-right: 3px;
        }

        @keyframes scale {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }

        @keyframes backdrop {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 101
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_toolbar(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "toolbar"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "toolbar"));

        // line 102
        yield "    ";
        if ((CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 102, $this->source); })()), "callsCount", [], "any", false, false, true, 102) > 0)) {
            // line 103
            yield "        ";
            $context["icon"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                // line 104
                yield "            ";
                yield Twig\Extension\CoreExtension::source($this->env, "@WebProfiler/Icon/workflow.svg");
                yield "
            <span class=\"sf-toolbar-value\">";
                // line 105
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 105, $this->source); })()), "callsCount", [], "any", false, false, true, 105), 105, $this->source), "html", null, true);
                yield "</span>
        ";
                yield from [];
            })())) ? '' : new Markup($tmp, $this->env->getCharset());
            // line 107
            yield "        ";
            $context["text"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                // line 108
                yield "            <div class=\"sf-toolbar-info-piece\">
                <b>Workflow Calls</b>
                <span>";
                // line 110
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 110, $this->source); })()), "callsCount", [], "any", false, false, true, 110), 110, $this->source), "html", null, true);
                yield "</span>
            </div>
        ";
                yield from [];
            })())) ? '' : new Markup($tmp, $this->env->getCharset());
            // line 113
            yield "
        ";
            // line 114
            yield Twig\Extension\CoreExtension::include($this->env, $context, "@WebProfiler/Profiler/toolbar_item.html.twig", ["link" => $this->sandbox->ensureToStringAllowed((isset($context["profiler_url"]) || array_key_exists("profiler_url", $context) ? $context["profiler_url"] : (function () { throw new RuntimeError('Variable "profiler_url" does not exist.', 114, $this->source); })()), 114, $this->source)]);
            yield "
    ";
        }
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 118
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

        // line 119
        yield "    <span class=\"label ";
        yield (((Twig\Extension\CoreExtension::length($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 119, $this->source); })()), "workflows", [], "any", false, false, true, 119), 119, $this->source)) == 0)) ? ("disabled") : (""));
        yield "\">
        <span class=\"icon\">
            ";
        // line 121
        yield Twig\Extension\CoreExtension::source($this->env, "@WebProfiler/Icon/workflow.svg");
        yield "
        </span>
        <strong>Workflow</strong>
    </span>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 127
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

        // line 128
        yield "    <h2>Workflow</h2>

    ";
        // line 130
        if ((Twig\Extension\CoreExtension::length($this->env->getCharset(), CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 130, $this->source); })()), "workflows", [], "any", false, false, true, 130)) == 0)) {
            // line 131
            yield "        <div class=\"empty empty-panel\">
            <p>There are no workflows configured.</p>
        </div>
    ";
        } else {
            // line 135
            yield "        <script type=\"module\">
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
            mermaid.initialize({
                flowchart: { useMaxWidth: false },
                securityLevel: 'loose',
            });

            ";
            // line 142
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 142, $this->source); })()), "workflows", [], "any", false, false, true, 142));
            foreach ($context['_seq'] as $context["name"] => $context["data"]) {
                // line 143
                yield "                window.showNodeDetails";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 143, $this->source); })()), "hash", [$context["name"]], "method", false, false, true, 143), 143, $this->source), "html", null, true);
                yield " = function (node) {
                    const map = ";
                // line 144
                yield json_encode($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["data"], "listeners", [], "any", false, false, true, 144), 144, $this->source));
                yield ";
                    showNodeDetails(node, map);
                };
            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['name'], $context['data'], $context['_parent']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 148
            yield "
            const showNodeDetails = function (node, map) {
                const dialog = document.getElementById('detailsDialog');

                dialog.querySelector('tbody').innerHTML = '';
                for (const [eventName, listeners] of Object.entries(map[node])) {
                    listeners.forEach(listener => {
                        const row = document.createElement('tr');

                        const eventNameCode = document.createElement('code');
                        eventNameCode.textContent = eventName;

                        const eventNameCell = document.createElement('td');
                        eventNameCell.appendChild(eventNameCode);
                        row.appendChild(eventNameCell);

                        const listenerDetailsCell = document.createElement('td');
                        row.appendChild(listenerDetailsCell);

                        let listenerDetails;
                        const listenerDetailsCode = document.createElement('code');
                        listenerDetailsCode.textContent = listener.title;
                        if (listener.file) {
                            const link = document.createElement('a');
                            link.href = listener.file;
                            link.appendChild(listenerDetailsCode);
                            listenerDetails = link;
                        } else {
                            listenerDetails = listenerDetailsCode;
                        }
                        listenerDetailsCell.appendChild(listenerDetails);

                        if (typeof listener.guardExpressions === 'object') {
                            listenerDetailsCell.appendChild(document.createElement('br'));

                            const guardExpressionsWrapper = document.createElement('span');
                            guardExpressionsWrapper.appendChild(document.createTextNode('guard expressions: '));

                            listener.guardExpressions.forEach((expression, index) => {
                                if (index > 0) {
                                    guardExpressionsWrapper.appendChild(document.createTextNode(', '));
                                }

                                const expressionCode = document.createElement('code');
                                expressionCode.textContent = expression;
                                guardExpressionsWrapper.appendChild(expressionCode);
                            });

                            listenerDetailsCell.appendChild(guardExpressionsWrapper);
                        }

                        dialog.querySelector('tbody').appendChild(row);
                    });
                };

                if (dialog.dataset.processed) {
                    dialog.showModal();
                    return;
                }

                dialog.addEventListener('click', (e) => {
                    const rect = dialog.getBoundingClientRect();

                    const inDialog =
                        rect.top <= e.clientY &&
                        e.clientY <= rect.top + rect.height &&
                        rect.left <= e.clientX &&
                        e.clientX <= rect.left + rect.width;

                    !inDialog && dialog.close();
                });

                dialog.querySelectorAll('.cancel').forEach(elt => {
                    elt.addEventListener('click', () => dialog.close());
                });

                dialog.showModal();

                dialog.dataset.processed = true;
            };
            // We do not load all mermaid diagrams at once, but only when the tab is opened
            // This is because mermaid diagrams are in a tab, and cannot be renderer with a
            // \"good size\" if they are not visible
            document.addEventListener('DOMContentLoaded', () => {
                document.querySelectorAll('.tab').forEach((el) => {
                    const observer = new MutationObserver(() => {
                        if (!el.classList.contains('block')) {
                            return;
                        }
                        const mEl = el.querySelector('.sf-mermaid');
                        if (mEl.dataset.processed) {
                            return;
                        }
                        mermaid.run({
                            nodes: [mEl],
                        });
                    });
                    observer.observe(el, { attributeFilter: ['class'] });
                });
            });
        </script>

        <div class=\"sf-tabs js-tabs\">
            ";
            // line 251
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 251, $this->source); })()), "workflows", [], "any", false, false, true, 251));
            foreach ($context['_seq'] as $context["name"] => $context["data"]) {
                // line 252
                yield "                <div class=\"tab\">
                    <h2 class=\"tab-title\">";
                // line 253
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["name"], 253, $this->source), "html", null, true);
                if (Twig\Extension\CoreExtension::length($this->env->getCharset(), CoreExtension::getAttribute($this->env, $this->source, $context["data"], "calls", [], "any", false, false, true, 253))) {
                    yield " (";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::length($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["data"], "calls", [], "any", false, false, true, 253), 253, $this->source)), "html", null, true);
                    yield ")";
                }
                yield "</h2>

                    <div class=\"tab-content\">
                        <h3>Definition</h3>
                        <pre class=\"sf-mermaid\">
                            ";
                // line 258
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["data"], "dump", [], "any", false, false, true, 258), 258, $this->source);
                yield "
                            ";
                // line 259
                $context['_parent'] = $context;
                $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["data"], "listeners", [], "any", false, false, true, 259));
                foreach ($context['_seq'] as $context["nodeId"] => $context["events"]) {
                    // line 260
                    yield "                                click ";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["nodeId"], 260, $this->source), "html", null, true);
                    yield " showNodeDetails";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["collector"]) || array_key_exists("collector", $context) ? $context["collector"] : (function () { throw new RuntimeError('Variable "collector" does not exist.', 260, $this->source); })()), "hash", [$context["name"]], "method", false, false, true, 260), 260, $this->source), "html", null, true);
                    yield "
                            ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['nodeId'], $context['events'], $context['_parent']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 262
                yield "                        </pre>

                        <h3>Calls</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Call</th>
                                    <th>Args</th>
                                    <th>Return</th>
                                    <th>Exception</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                ";
                // line 277
                $context['_parent'] = $context;
                $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["data"], "calls", [], "any", false, false, true, 277));
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
                foreach ($context['_seq'] as $context["_key"] => $context["call"]) {
                    // line 278
                    yield "                                    <tr>
                                        <td class=\"font-normal text-small text-muted nowrap\">";
                    // line 279
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index", [], "any", false, false, true, 279), 279, $this->source), "html", null, true);
                    yield "</td>
                                        <td>
                                            <code>";
                    // line 281
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["call"], "method", [], "any", false, false, true, 281), 281, $this->source), "html", null, true);
                    yield "()</code>
                                            ";
                    // line 282
                    if ((((CoreExtension::getAttribute($this->env, $this->source, $context["call"], "previousMarking", [], "any", true, true, true, 282) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, $context["call"], "previousMarking", [], "any", false, false, true, 282)))) ? (CoreExtension::getAttribute($this->env, $this->source, $context["call"], "previousMarking", [], "any", false, false, true, 282)) : (null))) {
                        // line 283
                        yield "                                                <hr />
                                                Previous marking:
                                                ";
                        // line 285
                        yield $this->extensions['Symfony\Bundle\WebProfilerBundle\Twig\WebProfilerExtension']->dumpData($this->env, $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["call"], "previousMarking", [], "any", false, false, true, 285), 285, $this->source));
                        yield "
                                            ";
                    }
                    // line 287
                    yield "                                        </td>
                                        <td>
                                            ";
                    // line 289
                    yield $this->extensions['Symfony\Bundle\WebProfilerBundle\Twig\WebProfilerExtension']->dumpData($this->env, $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["call"], "args", [], "any", false, false, true, 289), 289, $this->source));
                    yield "
                                        </td>
                                        <td>
                                            ";
                    // line 292
                    if (CoreExtension::getAttribute($this->env, $this->source, $context["call"], "return", [], "any", true, true, true, 292)) {
                        // line 293
                        yield "                                                ";
                        if ((CoreExtension::getAttribute($this->env, $this->source, $context["call"], "return", [], "any", false, false, true, 293) === true)) {
                            // line 294
                            yield "                                                    <code>true</code>
                                                ";
                        } elseif ((CoreExtension::getAttribute($this->env, $this->source,                         // line 295
$context["call"], "return", [], "any", false, false, true, 295) === false)) {
                            // line 296
                            yield "                                                    <code>false</code>
                                                ";
                        } else {
                            // line 298
                            yield "                                                    ";
                            yield $this->extensions['Symfony\Bundle\WebProfilerBundle\Twig\WebProfilerExtension']->dumpData($this->env, $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["call"], "return", [], "any", false, false, true, 298), 298, $this->source));
                            yield "
                                                ";
                        }
                        // line 300
                        yield "                                            ";
                    }
                    // line 301
                    yield "                                        </td>
                                        <td>
                                            ";
                    // line 303
                    if (CoreExtension::getAttribute($this->env, $this->source, $context["call"], "exception", [], "any", true, true, true, 303)) {
                        // line 304
                        yield "                                                ";
                        yield $this->extensions['Symfony\Bundle\WebProfilerBundle\Twig\WebProfilerExtension']->dumpData($this->env, $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["call"], "exception", [], "any", false, false, true, 304), 304, $this->source));
                        yield "
                                            ";
                    }
                    // line 306
                    yield "                                        </td>
                                        <td>
                                            ";
                    // line 308
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["call"], "duration", [], "any", false, false, true, 308), 308, $this->source), "html", null, true);
                    yield "ms
                                        </td>
                                    </tr>
                                ";
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
                unset($context['_seq'], $context['_key'], $context['call'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 312
                yield "                            </tbody>
                        </table>
                    </div>
                </div>
            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['name'], $context['data'], $context['_parent']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 317
            yield "        </div>
    ";
        }
        // line 319
        yield "
    <dialog id=\"detailsDialog\">
        <h2>
            Event listeners
            <i class=\"cancel\">×</i>
        </h2>

        <table>
            <thead>
                <tr>
                    <th>event</th>
                    <th>listener</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <menu>
            <small><i>⌨</i> <kbd>esc</kbd></small>
            <button class=\"btn btn-sm cancel\">Close</button>
        </menu>
    </dialog>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "@WebProfiler/Collector/workflow.html.twig";
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
        return array (  620 => 319,  616 => 317,  606 => 312,  588 => 308,  584 => 306,  578 => 304,  576 => 303,  572 => 301,  569 => 300,  563 => 298,  559 => 296,  557 => 295,  554 => 294,  551 => 293,  549 => 292,  543 => 289,  539 => 287,  534 => 285,  530 => 283,  528 => 282,  524 => 281,  519 => 279,  516 => 278,  499 => 277,  482 => 262,  471 => 260,  467 => 259,  463 => 258,  450 => 253,  447 => 252,  443 => 251,  338 => 148,  328 => 144,  323 => 143,  319 => 142,  310 => 135,  304 => 131,  302 => 130,  298 => 128,  285 => 127,  269 => 121,  263 => 119,  250 => 118,  236 => 114,  233 => 113,  226 => 110,  222 => 108,  219 => 107,  213 => 105,  208 => 104,  205 => 103,  202 => 102,  189 => 101,  81 => 4,  68 => 3,  45 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% extends '@WebProfiler/Profiler/layout.html.twig' %}

{% block stylesheets %}
    {{ parent() }}
    <style>
        dialog {
            border: none;
            border-radius: 6px;
            box-shadow: var(--settings-modal-shadow);
            max-width: 94%;
            width: 1200px;
        }

        dialog::backdrop {
            background: linear-gradient(
                45deg,
                rgb(18, 18, 20, 0.4),
                rgb(17, 17, 20, 0.8)
            );
        }

        dialog[open] {
            animation: scale 0.3s ease normal;
        }

        dialog[open]::backdrop {
            animation: backdrop 0.3s ease normal;
        }

        dialog.hide {
            animation-direction: reverse;
        }

        dialog h2 {
            margin-top: 0.2em
        }

        dialog i.cancel {
            cursor: pointer;
            padding: 0 5px;
            float: right;
        }

        dialog table {
            border: 1px solid #ccc;
            border-collapse: collapse;
            margin: 0 0 1em 0;
            margin-bottom: 1em;
            padding: 0;
            table-layout: fixed;
        }

        dialog table tr {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            padding: .35em;
        }

        dialog table th,
        dialog table td {
            padding: .625em;
            text-align: center;
            word-wrap: break-word;
        }

        dialog table th {
            font-size: .85em;
            letter-spacing: .1em;
            text-transform: uppercase;
        }

        dialog menu {
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            flex-direction: row;
            vertical-align: middle;
            justify-content: center;
        }

        dialog menu small {
            margin-right: auto;
        }
        dialog menu small i {
            margin-right: 3px;
        }

        @keyframes scale {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }

        @keyframes backdrop {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
{% endblock %}

{% block toolbar %}
    {% if collector.callsCount > 0 %}
        {% set icon %}
            {{ source('@WebProfiler/Icon/workflow.svg') }}
            <span class=\"sf-toolbar-value\">{{ collector.callsCount }}</span>
        {% endset %}
        {% set text %}
            <div class=\"sf-toolbar-info-piece\">
                <b>Workflow Calls</b>
                <span>{{ collector.callsCount }}</span>
            </div>
        {% endset %}

        {{ include('@WebProfiler/Profiler/toolbar_item.html.twig', { link: profiler_url }) }}
    {% endif %}
{% endblock %}

{% block menu %}
    <span class=\"label {{ collector.workflows|length == 0 ? 'disabled' }}\">
        <span class=\"icon\">
            {{ source('@WebProfiler/Icon/workflow.svg') }}
        </span>
        <strong>Workflow</strong>
    </span>
{% endblock %}

{% block panel %}
    <h2>Workflow</h2>

    {% if collector.workflows|length == 0 %}
        <div class=\"empty empty-panel\">
            <p>There are no workflows configured.</p>
        </div>
    {% else %}
        <script type=\"module\">
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
            mermaid.initialize({
                flowchart: { useMaxWidth: false },
                securityLevel: 'loose',
            });

            {% for name, data in collector.workflows %}
                window.showNodeDetails{{ collector.hash(name) }} = function (node) {
                    const map = {{ data.listeners|json_encode|raw }};
                    showNodeDetails(node, map);
                };
            {% endfor %}

            const showNodeDetails = function (node, map) {
                const dialog = document.getElementById('detailsDialog');

                dialog.querySelector('tbody').innerHTML = '';
                for (const [eventName, listeners] of Object.entries(map[node])) {
                    listeners.forEach(listener => {
                        const row = document.createElement('tr');

                        const eventNameCode = document.createElement('code');
                        eventNameCode.textContent = eventName;

                        const eventNameCell = document.createElement('td');
                        eventNameCell.appendChild(eventNameCode);
                        row.appendChild(eventNameCell);

                        const listenerDetailsCell = document.createElement('td');
                        row.appendChild(listenerDetailsCell);

                        let listenerDetails;
                        const listenerDetailsCode = document.createElement('code');
                        listenerDetailsCode.textContent = listener.title;
                        if (listener.file) {
                            const link = document.createElement('a');
                            link.href = listener.file;
                            link.appendChild(listenerDetailsCode);
                            listenerDetails = link;
                        } else {
                            listenerDetails = listenerDetailsCode;
                        }
                        listenerDetailsCell.appendChild(listenerDetails);

                        if (typeof listener.guardExpressions === 'object') {
                            listenerDetailsCell.appendChild(document.createElement('br'));

                            const guardExpressionsWrapper = document.createElement('span');
                            guardExpressionsWrapper.appendChild(document.createTextNode('guard expressions: '));

                            listener.guardExpressions.forEach((expression, index) => {
                                if (index > 0) {
                                    guardExpressionsWrapper.appendChild(document.createTextNode(', '));
                                }

                                const expressionCode = document.createElement('code');
                                expressionCode.textContent = expression;
                                guardExpressionsWrapper.appendChild(expressionCode);
                            });

                            listenerDetailsCell.appendChild(guardExpressionsWrapper);
                        }

                        dialog.querySelector('tbody').appendChild(row);
                    });
                };

                if (dialog.dataset.processed) {
                    dialog.showModal();
                    return;
                }

                dialog.addEventListener('click', (e) => {
                    const rect = dialog.getBoundingClientRect();

                    const inDialog =
                        rect.top <= e.clientY &&
                        e.clientY <= rect.top + rect.height &&
                        rect.left <= e.clientX &&
                        e.clientX <= rect.left + rect.width;

                    !inDialog && dialog.close();
                });

                dialog.querySelectorAll('.cancel').forEach(elt => {
                    elt.addEventListener('click', () => dialog.close());
                });

                dialog.showModal();

                dialog.dataset.processed = true;
            };
            // We do not load all mermaid diagrams at once, but only when the tab is opened
            // This is because mermaid diagrams are in a tab, and cannot be renderer with a
            // \"good size\" if they are not visible
            document.addEventListener('DOMContentLoaded', () => {
                document.querySelectorAll('.tab').forEach((el) => {
                    const observer = new MutationObserver(() => {
                        if (!el.classList.contains('block')) {
                            return;
                        }
                        const mEl = el.querySelector('.sf-mermaid');
                        if (mEl.dataset.processed) {
                            return;
                        }
                        mermaid.run({
                            nodes: [mEl],
                        });
                    });
                    observer.observe(el, { attributeFilter: ['class'] });
                });
            });
        </script>

        <div class=\"sf-tabs js-tabs\">
            {% for name, data in collector.workflows %}
                <div class=\"tab\">
                    <h2 class=\"tab-title\">{{ name }}{% if data.calls|length %} ({{ data.calls|length }}){% endif %}</h2>

                    <div class=\"tab-content\">
                        <h3>Definition</h3>
                        <pre class=\"sf-mermaid\">
                            {{ data.dump|raw }}
                            {% for nodeId, events in data.listeners %}
                                click {{ nodeId }} showNodeDetails{{ collector.hash(name) }}
                            {% endfor %}
                        </pre>

                        <h3>Calls</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Call</th>
                                    <th>Args</th>
                                    <th>Return</th>
                                    <th>Exception</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {% for call in data.calls %}
                                    <tr>
                                        <td class=\"font-normal text-small text-muted nowrap\">{{ loop.index }}</td>
                                        <td>
                                            <code>{{ call.method }}()</code>
                                            {% if call.previousMarking ?? null %}
                                                <hr />
                                                Previous marking:
                                                {{ profiler_dump(call.previousMarking) }}
                                            {% endif %}
                                        </td>
                                        <td>
                                            {{ profiler_dump(call.args) }}
                                        </td>
                                        <td>
                                            {% if call.return is defined %}
                                                {% if call.return is same as true %}
                                                    <code>true</code>
                                                {% elseif call.return is same as false %}
                                                    <code>false</code>
                                                {% else %}
                                                    {{ profiler_dump(call.return) }}
                                                {% endif %}
                                            {% endif %}
                                        </td>
                                        <td>
                                            {% if call.exception is defined %}
                                                {{ profiler_dump(call.exception) }}
                                            {% endif %}
                                        </td>
                                        <td>
                                            {{ call.duration }}ms
                                        </td>
                                    </tr>
                                {% endfor %}
                            </tbody>
                        </table>
                    </div>
                </div>
            {% endfor %}
        </div>
    {% endif %}

    <dialog id=\"detailsDialog\">
        <h2>
            Event listeners
            <i class=\"cancel\">×</i>
        </h2>

        <table>
            <thead>
                <tr>
                    <th>event</th>
                    <th>listener</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <menu>
            <small><i>⌨</i> <kbd>esc</kbd></small>
            <button class=\"btn btn-sm cancel\">Close</button>
        </menu>
    </dialog>
{% endblock %}
", "@WebProfiler/Collector/workflow.html.twig", "/var/www/pimcore/vendor/symfony/web-profiler-bundle/Resources/views/Collector/workflow.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["extends" => 1, "if" => 102, "set" => 103, "for" => 142];
        static $filters = ["escape" => 105, "length" => 119, "raw" => 144, "json_encode" => 144];
        static $functions = ["source" => 104, "include" => 114, "profiler_dump" => 285];

        try {
            $this->sandbox->checkSecurity(
                ['extends', 'if', 'set', 'for'],
                ['escape', 'length', 'raw', 'json_encode'],
                ['source', 'include', 'profiler_dump'],
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
