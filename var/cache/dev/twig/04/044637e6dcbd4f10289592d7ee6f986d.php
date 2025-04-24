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

/* @PimcoreAdmin/admin/asset/get_preview_pdf_open_in_new_tab.html.twig */
class __TwigTemplate_a0480828ca13aa3953f0f12f51dba893 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/get_preview_pdf_open_in_new_tab.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/get_preview_pdf_open_in_new_tab.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">

    <style>

        /* hide from ie on mac \\*/
        html {
            height: 100%;
        }
        /* end hide */

        body {
            height: 100%;
            margin: 0;
            padding: 0;
            background: #EEE;
        }

        #container {
            text-align: center;
            width: 100%;
        }

        ";
        // line 26
        if ( !(isset($context["thumbnailPath"]) || array_key_exists("thumbnailPath", $context) ? $context["thumbnailPath"] : (function () { throw new RuntimeError('Variable "thumbnailPath" does not exist.', 26, $this->source); })())) {
            // line 27
            yield "            #container {
                padding-top: 200px;
            }
        ";
        }
        // line 31
        yield "

        img {
            height: 600px;
            margin: 4px;
        }

    </style>
</head>

<body>

<div id=\"container\">
    ";
        // line 44
        if ((isset($context["thumbnailPath"]) || array_key_exists("thumbnailPath", $context) ? $context["thumbnailPath"] : (function () { throw new RuntimeError('Variable "thumbnailPath" does not exist.', 44, $this->source); })())) {
            // line 45
            yield "        <a href=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["assetPath"]) || array_key_exists("assetPath", $context) ? $context["assetPath"] : (function () { throw new RuntimeError('Variable "assetPath" does not exist.', 45, $this->source); })()), 45, $this->source), "html", null, true);
            yield "\" target=\"_blank\">
            <img alt=\"preview\" src=\"";
            // line 46
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["thumbnailPath"]) || array_key_exists("thumbnailPath", $context) ? $context["thumbnailPath"] : (function () { throw new RuntimeError('Variable "thumbnailPath" does not exist.', 46, $this->source); })()), 46, $this->source), "html", null, true);
            yield "\" />
        </a>
    ";
        } else {
            // line 49
            yield "        <span>";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("no_preview_available", [], "admin"), "html", null, true);
            yield "</span>
    ";
        }
        // line 51
        yield "    <div>
        <a href=\"";
        // line 52
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["assetPath"]) || array_key_exists("assetPath", $context) ? $context["assetPath"] : (function () { throw new RuntimeError('Variable "assetPath" does not exist.', 52, $this->source); })()), 52, $this->source), "html", null, true);
        yield "\" target=\"_blank\">";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("open_in_new_window", [], "admin"), "html", null, true);
        yield "</a>
    </div>
</div>


</body>
</html>
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
        return "@PimcoreAdmin/admin/asset/get_preview_pdf_open_in_new_tab.html.twig";
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
        return array (  122 => 52,  119 => 51,  113 => 49,  107 => 46,  102 => 45,  100 => 44,  85 => 31,  79 => 27,  77 => 26,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">

    <style>

        /* hide from ie on mac \\*/
        html {
            height: 100%;
        }
        /* end hide */

        body {
            height: 100%;
            margin: 0;
            padding: 0;
            background: #EEE;
        }

        #container {
            text-align: center;
            width: 100%;
        }

        {% if not thumbnailPath %}
            #container {
                padding-top: 200px;
            }
        {% endif %}


        img {
            height: 600px;
            margin: 4px;
        }

    </style>
</head>

<body>

<div id=\"container\">
    {% if thumbnailPath %}
        <a href=\"{{ assetPath }}\" target=\"_blank\">
            <img alt=\"preview\" src=\"{{ thumbnailPath }}\" />
        </a>
    {% else %}
        <span>{{ 'no_preview_available'|trans([], 'admin') }}</span>
    {% endif %}
    <div>
        <a href=\"{{ assetPath }}\" target=\"_blank\">{{ 'open_in_new_window'|trans([], 'admin') }}</a>
    </div>
</div>


</body>
</html>
", "@PimcoreAdmin/admin/asset/get_preview_pdf_open_in_new_tab.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/asset/get_preview_pdf_open_in_new_tab.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["if" => 26];
        static $filters = ["escape" => 45, "trans" => 49];
        static $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                ['escape', 'trans'],
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
