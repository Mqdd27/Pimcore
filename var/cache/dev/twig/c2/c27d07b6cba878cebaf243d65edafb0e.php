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

/* @PimcoreCore/Areabrick/wrapper.html.twig */
class __TwigTemplate_c82ab9adf93f7f9f18269518bbcd7d78 extends Template
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
            'areabrickWrapper' => [$this, 'block_areabrickWrapper'],
            'areabrickOpenTag' => [$this, 'block_areabrickOpenTag'],
            'areabrickFrontend' => [$this, 'block_areabrickFrontend'],
            'areabrickCloseTag' => [$this, 'block_areabrickCloseTag'],
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreCore/Areabrick/wrapper.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreCore/Areabrick/wrapper.html.twig"));

        // line 4
        yield "
";
        // line 6
        yield "
";
        // line 10
        yield "
";
        // line 11
        if (((isset($context["editmode"]) || array_key_exists("editmode", $context) ? $context["editmode"] : (function () { throw new RuntimeError('Variable "editmode" does not exist.', 11, $this->source); })()) && (isset($context["isAreaBlock"]) || array_key_exists("isAreaBlock", $context) ? $context["isAreaBlock"] : (function () { throw new RuntimeError('Variable "isAreaBlock" does not exist.', 11, $this->source); })()))) {
            // line 12
            yield "    <div class=\"pimcore_area_entry pimcore_block_entry\" ";
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeOuterAttributes"]) || array_key_exists("editmodeOuterAttributes", $context) ? $context["editmodeOuterAttributes"] : (function () { throw new RuntimeError('Variable "editmodeOuterAttributes" does not exist.', 12, $this->source); })()), 12, $this->source);
            yield " ";
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 12, $this->source); })()), 12, $this->source);
            yield ">
        <div class=\"pimcore_area_buttons\" ";
            // line 13
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 13, $this->source); })()), 13, $this->source);
            yield ">
            <div class=\"pimcore_area_buttons_inner\">
                <div class=\"pimcore_block_plus_up\" ";
            // line 15
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 15, $this->source); })()), 15, $this->source);
            yield "></div>
                <div class=\"pimcore_block_plus\" ";
            // line 16
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 16, $this->source); })()), 16, $this->source);
            yield "></div>
                <div class=\"pimcore_block_minus\" ";
            // line 17
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 17, $this->source); })()), 17, $this->source);
            yield "></div>
                <div class=\"pimcore_block_up\" ";
            // line 18
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 18, $this->source); })()), 18, $this->source);
            yield "></div>
                <div class=\"pimcore_block_down\" ";
            // line 19
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 19, $this->source); })()), 19, $this->source);
            yield "></div>

                <div class=\"pimcore_block_type\" ";
            // line 21
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 21, $this->source); })()), 21, $this->source);
            yield "></div>
                <div class=\"pimcore_block_options\" ";
            // line 22
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 22, $this->source); })()), 22, $this->source);
            yield "></div>
                <div class=\"pimcore_block_visibility\" ";
            // line 23
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 23, $this->source); })()), 23, $this->source);
            yield "></div>

                ";
            // line 25
            if ((isset($context["editableDialog"]) || array_key_exists("editableDialog", $context) ? $context["editableDialog"] : (function () { throw new RuntimeError('Variable "editableDialog" does not exist.', 25, $this->source); })())) {
                // line 26
                yield "                    <div class=\"pimcore_block_dialog\" ";
                yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 26, $this->source); })()), 26, $this->source);
                yield " ";
                yield $this->sandbox->ensureToStringAllowed((isset($context["editableDialogAttributes"]) || array_key_exists("editableDialogAttributes", $context) ? $context["editableDialogAttributes"] : (function () { throw new RuntimeError('Variable "editableDialogAttributes" does not exist.', 26, $this->source); })()), 26, $this->source);
                yield "></div>
                ";
            }
            // line 28
            yield "
                <div class=\"pimcore_block_label\" ";
            // line 29
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 29, $this->source); })()), 29, $this->source);
            yield "></div>
                <div class=\"pimcore_block_clear\" ";
            // line 30
            yield $this->sandbox->ensureToStringAllowed((isset($context["editmodeGenericAttributes"]) || array_key_exists("editmodeGenericAttributes", $context) ? $context["editmodeGenericAttributes"] : (function () { throw new RuntimeError('Variable "editmodeGenericAttributes" does not exist.', 30, $this->source); })()), 30, $this->source);
            yield "></div>
            </div>
        </div>
        ";
            // line 33
            if ((isset($context["editableDialog"]) || array_key_exists("editableDialog", $context) ? $context["editableDialog"] : (function () { throw new RuntimeError('Variable "editableDialog" does not exist.', 33, $this->source); })())) {
                // line 34
                yield "            <template id=\"dialogBoxConfig-";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["editableDialog"]) || array_key_exists("editableDialog", $context) ? $context["editableDialog"] : (function () { throw new RuntimeError('Variable "editableDialog" does not exist.', 34, $this->source); })()), "id", [], "any", false, false, true, 34), 34, $this->source), "html", null, true);
                yield "\">";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(json_encode($this->sandbox->ensureToStringAllowed((isset($context["editableDialog"]) || array_key_exists("editableDialog", $context) ? $context["editableDialog"] : (function () { throw new RuntimeError('Variable "editableDialog" does not exist.', 34, $this->source); })()), 34, $this->source)), "html", null, true);
                yield "</template>
            ";
                // line 35
                yield $this->sandbox->ensureToStringAllowed((isset($context["dialogHtml"]) || array_key_exists("dialogHtml", $context) ? $context["dialogHtml"] : (function () { throw new RuntimeError('Variable "dialogHtml" does not exist.', 35, $this->source); })()), 35, $this->source);
                yield "
        ";
            }
        }
        // line 38
        yield "
        ";
        // line 39
        yield from $this->unwrap()->yieldBlock('areabrickWrapper', $context, $blocks);
        // line 52
        yield "
";
        // line 53
        if (((isset($context["editmode"]) || array_key_exists("editmode", $context) ? $context["editmode"] : (function () { throw new RuntimeError('Variable "editmode" does not exist.', 53, $this->source); })()) && (isset($context["isAreaBlock"]) || array_key_exists("isAreaBlock", $context) ? $context["isAreaBlock"] : (function () { throw new RuntimeError('Variable "isAreaBlock" does not exist.', 53, $this->source); })()))) {
            // line 54
            yield "    </div>
";
        }
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    // line 39
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_areabrickWrapper(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "areabrickWrapper"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "areabrickWrapper"));

        // line 40
        yield "            ";
        yield from $this->unwrap()->yieldBlock('areabrickOpenTag', $context, $blocks);
        // line 43
        yield "
                ";
        // line 44
        yield from $this->unwrap()->yieldBlock('areabrickFrontend', $context, $blocks);
        // line 47
        yield "
            ";
        // line 48
        yield from $this->unwrap()->yieldBlock('areabrickCloseTag', $context, $blocks);
        // line 51
        yield "        ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 40
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_areabrickOpenTag(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "areabrickOpenTag"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "areabrickOpenTag"));

        // line 41
        yield "                ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["brick"]) || array_key_exists("brick", $context) ? $context["brick"] : (function () { throw new RuntimeError('Variable "brick" does not exist.', 41, $this->source); })()), "htmlTagOpen", [(isset($context["info"]) || array_key_exists("info", $context) ? $context["info"] : (function () { throw new RuntimeError('Variable "info" does not exist.', 41, $this->source); })())], "method", false, false, true, 41), 41, $this->source);
        yield "
            ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 44
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_areabrickFrontend(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "areabrickFrontend"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "areabrickFrontend"));

        // line 45
        yield "                    ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["templating"]) || array_key_exists("templating", $context) ? $context["templating"] : (function () { throw new RuntimeError('Variable "templating" does not exist.', 45, $this->source); })()), "render", [(isset($context["viewTemplate"]) || array_key_exists("viewTemplate", $context) ? $context["viewTemplate"] : (function () { throw new RuntimeError('Variable "viewTemplate" does not exist.', 45, $this->source); })()), (isset($context["viewParameters"]) || array_key_exists("viewParameters", $context) ? $context["viewParameters"] : (function () { throw new RuntimeError('Variable "viewParameters" does not exist.', 45, $this->source); })())], "method", false, false, true, 45), 45, $this->source);
        yield "
                ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 48
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_areabrickCloseTag(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "areabrickCloseTag"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "areabrickCloseTag"));

        // line 49
        yield "                ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["brick"]) || array_key_exists("brick", $context) ? $context["brick"] : (function () { throw new RuntimeError('Variable "brick" does not exist.', 49, $this->source); })()), "htmlTagClose", [(isset($context["info"]) || array_key_exists("info", $context) ? $context["info"] : (function () { throw new RuntimeError('Variable "info" does not exist.', 49, $this->source); })())], "method", false, false, true, 49), 49, $this->source);
        yield "
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
        return "@PimcoreCore/Areabrick/wrapper.html.twig";
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
        return array (  276 => 49,  263 => 48,  249 => 45,  236 => 44,  222 => 41,  209 => 40,  198 => 51,  196 => 48,  193 => 47,  191 => 44,  188 => 43,  185 => 40,  172 => 39,  159 => 54,  157 => 53,  154 => 52,  152 => 39,  149 => 38,  143 => 35,  136 => 34,  134 => 33,  128 => 30,  124 => 29,  121 => 28,  113 => 26,  111 => 25,  106 => 23,  102 => 22,  98 => 21,  93 => 19,  89 => 18,  85 => 17,  81 => 16,  77 => 15,  72 => 13,  65 => 12,  63 => 11,  60 => 10,  57 => 6,  54 => 4,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{# @var brick \\Pimcore\\Extension\\Document\\Areabrick\\AreabrickInterface #}
{# @var info \\Pimcore\\Model\\Document\\Editable\\Area\\Info #}
{# @var templating \\Symfony\\Component\\Templating\\EngineInterface #}

{# @var editmode bool #}

{# @var viewTemplate string #}
{# @var viewParameters array #}
{# @var editableDialog \\Pimcore\\Extension\\Document\\Areabrick\\EditableDialogBoxConfiguration #}

{% if editmode and isAreaBlock %}
    <div class=\"pimcore_area_entry pimcore_block_entry\" {{ editmodeOuterAttributes|raw }} {{ editmodeGenericAttributes|raw }}>
        <div class=\"pimcore_area_buttons\" {{ editmodeGenericAttributes|raw }}>
            <div class=\"pimcore_area_buttons_inner\">
                <div class=\"pimcore_block_plus_up\" {{ editmodeGenericAttributes|raw }}></div>
                <div class=\"pimcore_block_plus\" {{ editmodeGenericAttributes|raw }}></div>
                <div class=\"pimcore_block_minus\" {{ editmodeGenericAttributes|raw }}></div>
                <div class=\"pimcore_block_up\" {{ editmodeGenericAttributes|raw }}></div>
                <div class=\"pimcore_block_down\" {{ editmodeGenericAttributes|raw }}></div>

                <div class=\"pimcore_block_type\" {{ editmodeGenericAttributes|raw }}></div>
                <div class=\"pimcore_block_options\" {{ editmodeGenericAttributes|raw }}></div>
                <div class=\"pimcore_block_visibility\" {{ editmodeGenericAttributes|raw }}></div>

                {% if editableDialog %}
                    <div class=\"pimcore_block_dialog\" {{ editmodeGenericAttributes|raw }} {{ editableDialogAttributes|raw }}></div>
                {% endif %}

                <div class=\"pimcore_block_label\" {{ editmodeGenericAttributes|raw }}></div>
                <div class=\"pimcore_block_clear\" {{ editmodeGenericAttributes|raw }}></div>
            </div>
        </div>
        {% if editableDialog %}
            <template id=\"dialogBoxConfig-{{ editableDialog.id }}\">{{ editableDialog|json_encode() }}</template>
            {{ dialogHtml|raw }}
        {% endif %}
{% endif %}

        {% block areabrickWrapper %}
            {% block areabrickOpenTag %}
                {{ brick.htmlTagOpen(info) | raw }}
            {% endblock %}

                {% block areabrickFrontend %}
                    {{ templating.render(viewTemplate, viewParameters) | raw }}
                {% endblock %}

            {% block areabrickCloseTag %}
                {{ brick.htmlTagClose(info) | raw }}
            {% endblock %}
        {% endblock %}

{% if editmode and isAreaBlock %}
    </div>
{% endif %}
", "@PimcoreCore/Areabrick/wrapper.html.twig", "/var/www/pimcore/vendor/pimcore/pimcore/bundles/CoreBundle/templates/Areabrick/wrapper.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["if" => 11, "block" => 39];
        static $filters = ["raw" => 12, "escape" => 34, "json_encode" => 34];
        static $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'block'],
                ['raw', 'escape', 'json_encode'],
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
