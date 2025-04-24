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

/* @PimcoreAdmin/admin/install/check.html.twig */
class __TwigTemplate_bfe9bb72bd3a961e49a74f0289841f0b extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/install/check.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/install/check.html.twig"));

        // line 1
        if ( !(isset($context["headless"]) || array_key_exists("headless", $context) ? $context["headless"] : (function () { throw new RuntimeError('Variable "headless" does not exist.', 1, $this->source); })())) {
            // line 2
            yield "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"robots\" content=\"noindex, nofollow\" />
</head>
<body>";
        }
        // line 10
        yield "
";
        // line 31
        yield "
";
        // line 32
        $macros["s"] = $this->macros["s"] = $this;
        // line 33
        yield "
    <style type=\"text/css\">
        body {
            font-family: Arial, Tahoma, Verdana;
            font-size: 12px;
        }

        h2 {
            font-size: 16px;
            margin: 0;
            padding: 0 0 5px 0;
        }

        table {
            border-collapse: collapse;
        }

        a {
            color: #0066cc;
        }

        .legend {
            display: inline-block;
        }

        div.legend {
            padding-left: 20px;
        }

        span.legend {
            line-height: 30px;
            position: relative;
            padding: 0 30px 0 40px;
        }

        .legend img {
            position: absolute;
            top: 0;
            left: 0;
            width:30px;
        }

        table img {
            width:20px;
        }
    </style>

    <table cellpadding=\"20\">
        <tr>
            <td valign=\"top\">
                <h2>PHP</h2>
                <table border=\"1\" cellpadding=\"3\" cellspacing=\"0\">

                    ";
        // line 86
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["checksPHP"]) || array_key_exists("checksPHP", $context) ? $context["checksPHP"] : (function () { throw new RuntimeError('Variable "checksPHP" does not exist.', 86, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["check"]) {
            // line 87
            yield "                        ";
            yield $macros["s"]->getTemplateForMacro("macro_check", $context, 87, $this->getSourceContext())->macro_check(...[$context["check"]]);
            yield "
                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['check'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 89
        yield "
                </table>
            </td>
            <td valign=\"top\">
                <h2>MySQL</h2>
                <table border=\"1\" cellpadding=\"3\" cellspacing=\"0\">

                    ";
        // line 96
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["checksMySQL"]) || array_key_exists("checksMySQL", $context) ? $context["checksMySQL"] : (function () { throw new RuntimeError('Variable "checksMySQL" does not exist.', 96, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["check"]) {
            // line 97
            yield "                        ";
            yield $macros["s"]->getTemplateForMacro("macro_check", $context, 97, $this->getSourceContext())->macro_check(...[$context["check"]]);
            yield "
                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['check'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 99
        yield "
                </table>
            </td>
            <td valign=\"top\">
                <h2>Filesystem</h2>
                <table border=\"1\" cellpadding=\"3\" cellspacing=\"0\">

                    ";
        // line 106
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["checksFS"]) || array_key_exists("checksFS", $context) ? $context["checksFS"] : (function () { throw new RuntimeError('Variable "checksFS" does not exist.', 106, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["check"]) {
            // line 107
            yield "                        ";
            yield $macros["s"]->getTemplateForMacro("macro_check", $context, 107, $this->getSourceContext())->macro_check(...[$context["check"]]);
            yield "
                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['check'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 109
        yield "
                </table>

                <br />
                <br />

                <h2>CLI Tools &amp; Applications</h2>
                <table border=\"1\" cellpadding=\"3\" cellspacing=\"0\">

                    ";
        // line 118
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["checksApps"]) || array_key_exists("checksApps", $context) ? $context["checksApps"] : (function () { throw new RuntimeError('Variable "checksApps" does not exist.', 118, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["check"]) {
            // line 119
            yield "                        ";
            yield $macros["s"]->getTemplateForMacro("macro_check", $context, 119, $this->getSourceContext())->macro_check(...[$context["check"]]);
            yield "
                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['check'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 121
        yield "
                </table>
            </td>
        </tr>
    </table>

    <div class=\"legend\">
        <p>
            <b>Explanation:</b>
        </p>
        <p>
            <span class=\"legend\"><img src=\"/bundles/pimcoreadmin/img/flat-color-icons/ok.svg\" />Everything ok</span>
            <span class=\"legend\"><img width=\"26\" height=\"26\" src=\"/bundles/pimcoreadmin/img/flat-color-icons/overlay-error.svg\" /> Recommended but not required</span>
            <span class=\"legend\"><img src=\"/bundles/pimcoreadmin/img/flat-color-icons/high_priority.svg\" /> Required</span>
        </p>
    </div>

";
        // line 138
        if ( !(isset($context["headless"]) || array_key_exists("headless", $context) ? $context["headless"] : (function () { throw new RuntimeError('Variable "headless" does not exist.', 138, $this->source); })())) {
            // line 139
            yield "</body>
</html>";
        }
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    // line 11
    public function macro_check($check = null, ...$varargs): string|Markup
    {
        $macros = $this->macros;
        $context = [
            "check" => $check,
            "varargs" => $varargs,
        ] + $this->env->getGlobals();

        $blocks = [];

        return ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
            $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "macro", "check"));

            $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
            $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "macro", "check"));

            // line 12
            yield "    ";
            $context["icon"] = "high_priority";
            // line 13
            yield "    ";
            if ((CoreExtension::getAttribute($this->env, $this->source, (isset($context["check"]) || array_key_exists("check", $context) ? $context["check"] : (function () { throw new RuntimeError('Variable "check" does not exist.', 13, $this->source); })()), "state", [], "any", false, false, true, 13) == Twig\Extension\CoreExtension::constant("Pimcore\\Tool\\Requirements\\Check::STATE_OK"))) {
                // line 14
                yield "        ";
                $context["icon"] = "ok";
                // line 15
                yield "    ";
            } elseif ((CoreExtension::getAttribute($this->env, $this->source, (isset($context["check"]) || array_key_exists("check", $context) ? $context["check"] : (function () { throw new RuntimeError('Variable "check" does not exist.', 15, $this->source); })()), "state", [], "any", false, false, true, 15) == Twig\Extension\CoreExtension::constant("Pimcore\\Tool\\Requirements\\Check::STATE_WARNING"))) {
                // line 16
                yield "        ";
                $context["icon"] = "overlay-error";
                // line 17
                yield "    ";
            }
            // line 18
            yield "
    <tr>
        <td>
            ";
            // line 21
            if ( !Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, (isset($context["check"]) || array_key_exists("check", $context) ? $context["check"] : (function () { throw new RuntimeError('Variable "check" does not exist.', 21, $this->source); })()), "link", [], "any", false, false, true, 21))) {
                // line 22
                yield "                <a href=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["check"]) || array_key_exists("check", $context) ? $context["check"] : (function () { throw new RuntimeError('Variable "check" does not exist.', 22, $this->source); })()), "link", [], "any", false, false, true, 22), 22, $this->source), "html", null, true);
                yield "\" target=\"_blank\">";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["check"]) || array_key_exists("check", $context) ? $context["check"] : (function () { throw new RuntimeError('Variable "check" does not exist.', 22, $this->source); })()), "name", [], "any", false, false, true, 22), 22, $this->source), "html", null, true);
                yield "</a>
            ";
            } else {
                // line 24
                yield "                ";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["check"]) || array_key_exists("check", $context) ? $context["check"] : (function () { throw new RuntimeError('Variable "check" does not exist.', 24, $this->source); })()), "name", [], "any", false, false, true, 24), 24, $this->source), "html", null, true);
                yield "
            ";
            }
            // line 26
            yield "        </td>

        <td><img src=\"/bundles/pimcoreadmin/img/flat-color-icons/";
            // line 28
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["icon"]) || array_key_exists("icon", $context) ? $context["icon"] : (function () { throw new RuntimeError('Variable "icon" does not exist.', 28, $this->source); })()), 28, $this->source), "html", null, true);
            yield ".svg\" title=\"";
            if (CoreExtension::getAttribute($this->env, $this->source, ($context["check"] ?? null), "message", [], "any", true, true, true, 28)) {
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["check"]) || array_key_exists("check", $context) ? $context["check"] : (function () { throw new RuntimeError('Variable "check" does not exist.', 28, $this->source); })()), "message", [], "any", false, false, true, 28), 28, $this->source), "html", null, true);
            }
            yield "\" /></td>
    </tr>
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
        return "@PimcoreAdmin/admin/install/check.html.twig";
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
        return array (  300 => 28,  296 => 26,  290 => 24,  282 => 22,  280 => 21,  275 => 18,  272 => 17,  269 => 16,  266 => 15,  263 => 14,  260 => 13,  257 => 12,  239 => 11,  226 => 139,  224 => 138,  205 => 121,  196 => 119,  192 => 118,  181 => 109,  172 => 107,  168 => 106,  159 => 99,  150 => 97,  146 => 96,  137 => 89,  128 => 87,  124 => 86,  69 => 33,  67 => 32,  64 => 31,  61 => 10,  52 => 2,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% if not headless -%}
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"robots\" content=\"noindex, nofollow\" />
</head>
<body>
{%- endif %}

{% macro check(check) %}
    {% set icon = 'high_priority' %}
    {% if check.state == constant('\\Pimcore\\\\Tool\\\\Requirements\\\\Check::STATE_OK') %}
        {% set icon = 'ok' %}
    {% elseif check.state == constant('\\Pimcore\\\\Tool\\\\Requirements\\\\Check::STATE_WARNING') %}
        {% set icon = 'overlay-error' %}
    {% endif %}

    <tr>
        <td>
            {% if check.link is not empty %}
                <a href=\"{{ check.link }}\" target=\"_blank\">{{ check.name }}</a>
            {% else %}
                {{ check.name }}
            {% endif %}
        </td>

        <td><img src=\"/bundles/pimcoreadmin/img/flat-color-icons/{{ icon }}.svg\" title=\"{% if check.message is defined %}{{ check.message }}{%  endif %}\" /></td>
    </tr>
{% endmacro %}

{% import _self as s %}

    <style type=\"text/css\">
        body {
            font-family: Arial, Tahoma, Verdana;
            font-size: 12px;
        }

        h2 {
            font-size: 16px;
            margin: 0;
            padding: 0 0 5px 0;
        }

        table {
            border-collapse: collapse;
        }

        a {
            color: #0066cc;
        }

        .legend {
            display: inline-block;
        }

        div.legend {
            padding-left: 20px;
        }

        span.legend {
            line-height: 30px;
            position: relative;
            padding: 0 30px 0 40px;
        }

        .legend img {
            position: absolute;
            top: 0;
            left: 0;
            width:30px;
        }

        table img {
            width:20px;
        }
    </style>

    <table cellpadding=\"20\">
        <tr>
            <td valign=\"top\">
                <h2>PHP</h2>
                <table border=\"1\" cellpadding=\"3\" cellspacing=\"0\">

                    {% for check in checksPHP %}
                        {{ s.check(check) }}
                    {% endfor %}

                </table>
            </td>
            <td valign=\"top\">
                <h2>MySQL</h2>
                <table border=\"1\" cellpadding=\"3\" cellspacing=\"0\">

                    {% for check in checksMySQL %}
                        {{ s.check(check) }}
                    {% endfor %}

                </table>
            </td>
            <td valign=\"top\">
                <h2>Filesystem</h2>
                <table border=\"1\" cellpadding=\"3\" cellspacing=\"0\">

                    {% for check in checksFS %}
                        {{ s.check(check) }}
                    {% endfor %}

                </table>

                <br />
                <br />

                <h2>CLI Tools &amp; Applications</h2>
                <table border=\"1\" cellpadding=\"3\" cellspacing=\"0\">

                    {% for check in checksApps %}
                        {{ s.check(check) }}
                    {% endfor %}

                </table>
            </td>
        </tr>
    </table>

    <div class=\"legend\">
        <p>
            <b>Explanation:</b>
        </p>
        <p>
            <span class=\"legend\"><img src=\"/bundles/pimcoreadmin/img/flat-color-icons/ok.svg\" />Everything ok</span>
            <span class=\"legend\"><img width=\"26\" height=\"26\" src=\"/bundles/pimcoreadmin/img/flat-color-icons/overlay-error.svg\" /> Recommended but not required</span>
            <span class=\"legend\"><img src=\"/bundles/pimcoreadmin/img/flat-color-icons/high_priority.svg\" /> Required</span>
        </p>
    </div>

{% if not headless -%}
</body>
</html>
{%- endif %}
", "@PimcoreAdmin/admin/install/check.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/install/check.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["if" => 1, "macro" => 11, "import" => 32, "for" => 86, "set" => 12];
        static $filters = ["escape" => 22];
        static $functions = ["constant" => 13];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'macro', 'import', 'for', 'set'],
                ['escape'],
                ['constant'],
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
