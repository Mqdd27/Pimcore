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

/* @PimcoreAdmin/admin/login/layout.html.twig */
class __TwigTemplate_15635fdcaa73cfcfaba485118b22544e extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/login/layout.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/login/layout.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to Pimcore!</title>

        <meta charset=\"UTF-8\">
        <meta name=\"robots\" content=\"noindex, follow\">

        <link rel=\"icon\" type=\"image/png\" href=\"/bundles/pimcoreadmin/img/favicon/favicon-32x32.png\">

        <link rel=\"stylesheet\" href=\"/bundles/pimcoreadmin/css/login.css\" type=\"text/css\">

        ";
        // line 13
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["pluginCssPaths"]) || array_key_exists("pluginCssPaths", $context) ? $context["pluginCssPaths"] : (function () { throw new RuntimeError('Variable "pluginCssPaths" does not exist.', 13, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["pluginCssPath"]) {
            // line 14
            yield "            <link rel=\"stylesheet\" type=\"text/css\" href=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["pluginCssPath"], 14, $this->source), "html", null, true);
            yield "?_dc=";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate("now", "U"), "html", null, true);
            yield "\">
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['pluginCssPath'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 16
        yield "    </head>
    <body class=\"pimcore_version_11 ";
        // line 17
        yield ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["adminSettings"]) || array_key_exists("adminSettings", $context) ? $context["adminSettings"] : (function () { throw new RuntimeError('Variable "adminSettings" does not exist.', 17, $this->source); })()), "branding", [], "array", false, false, true, 17), "login_screen_invert_colors", [], "array", false, false, true, 17)) ? ("inverted") : (""));
        yield "\">
        <style>
            #background {
                background-image: url(\"";
        // line 20
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Pimcore\Bundle\AdminBundle\Twig\Extension\AdminExtension']->getLoginBackgroundImage("/bundles/pimcoreadmin/img/login/pimconaut2024.jpg"), "html", null, true);
        yield "\");
            }
        </style>

        ";
        // line 24
        $context["customColor"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["adminSettings"]) || array_key_exists("adminSettings", $context) ? $context["adminSettings"] : (function () { throw new RuntimeError('Variable "adminSettings" does not exist.', 24, $this->source); })()), "branding", [], "array", false, false, true, 24), "color_login_screen", [], "array", false, false, true, 24);
        // line 25
        yield "        ";
        if ((!Twig\Extension\CoreExtension::testEmpty((isset($context["customColor"]) || array_key_exists("customColor", $context) ? $context["customColor"] : (function () { throw new RuntimeError('Variable "customColor" does not exist.', 25, $this->source); })())))) {
            // line 26
            yield "        <style>
            #content button {
                background: ";
            // line 28
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["customColor"]) || array_key_exists("customColor", $context) ? $context["customColor"] : (function () { throw new RuntimeError('Variable "customColor" does not exist.', 28, $this->source); })()), 28, $this->source), "html", null, true);
            yield ";
            }

            #content a {
                color: ";
            // line 32
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["customColor"]) || array_key_exists("customColor", $context) ? $context["customColor"] : (function () { throw new RuntimeError('Variable "customColor" does not exist.', 32, $this->source); })()), 32, $this->source), "html", null, true);
            yield ";
            }
        </style>
        ";
        }
        // line 36
        yield "
        <div id=\"logo\">
            <img alt=\"";
        // line 38
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Pimcore's logotype", [], "admin"), "html", null, true);
        yield "\" src=\"";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_settings_display_custom_logo") . ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["adminSettings"]) || array_key_exists("adminSettings", $context) ? $context["adminSettings"] : (function () { throw new RuntimeError('Variable "adminSettings" does not exist.', 38, $this->source); })()), "branding", [], "array", false, false, true, 38), "login_screen_invert_colors", [], "array", false, false, true, 38)) ? ("") : ("?white=true"))), "html", null, true);
        yield "\">
        </div>

        <div id=\"content\">
            ";
        // line 42
        yield from         $this->unwrap()->yieldBlock("content", $context, $blocks);
        yield "
        </div>

        ";
        // line 45
        if ((array_key_exists("debug", $context) && (isset($context["debug"]) || array_key_exists("debug", $context) ? $context["debug"] : (function () { throw new RuntimeError('Variable "debug" does not exist.', 45, $this->source); })()))) {
            // line 46
            yield "            <div id=\"github\">
                <a class=\"github-button\" href=\"https://github.com/pimcore/pimcore\" data-color-scheme=\"no-preference: dark; light: dark; dark: dark;\" data-size=\"large\" aria-label=\"Star pimcore/pimcore on GitHub\">Star</a>
            </div>
            <script async defer src=\"https://buttons.github.io/buttons.js\" ";
            // line 49
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 49, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 49), 49, $this->source);
            yield "></script>
        ";
        }
        // line 51
        yield "
        ";
        // line 65
        yield "
        <div id=\"contentBackground\"></div>
        <div id=\"background\"></div>
        <div id=\"footer\">
            &copy; 2009-";
        // line 69
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate("now", "Y"), "html", null, true);
        yield " <a href=\"http://www.pimcore.org/\">Pimcore GmbH</a><br>
            BE RESPECTFUL AND HONOR OUR WORK FOR FREE & OPEN SOURCE SOFTWARE BY NOT REMOVING OUR COPYRIGHT NOTICE!
            KEEP IN MIND THAT REMOVING THE COPYRIGHT NOTICE IS VIOLATING OUR LICENSING TERMS!
        </div>

        ";
        // line 74
        if (        $this->unwrap()->hasBlock("below_footer", $context, $blocks)) {
            // line 75
            yield "            ";
            yield from             $this->unwrap()->yieldBlock("below_footer", $context, $blocks);
            yield "
        ";
        }
        // line 77
        yield "
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
        return "@PimcoreAdmin/admin/login/layout.html.twig";
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
        return array (  174 => 77,  168 => 75,  166 => 74,  158 => 69,  152 => 65,  149 => 51,  144 => 49,  139 => 46,  137 => 45,  131 => 42,  122 => 38,  118 => 36,  111 => 32,  104 => 28,  100 => 26,  97 => 25,  95 => 24,  88 => 20,  82 => 17,  79 => 16,  68 => 14,  64 => 13,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to Pimcore!</title>

        <meta charset=\"UTF-8\">
        <meta name=\"robots\" content=\"noindex, follow\">

        <link rel=\"icon\" type=\"image/png\" href=\"/bundles/pimcoreadmin/img/favicon/favicon-32x32.png\">

        <link rel=\"stylesheet\" href=\"/bundles/pimcoreadmin/css/login.css\" type=\"text/css\">

        {% for pluginCssPath in pluginCssPaths %}
            <link rel=\"stylesheet\" type=\"text/css\" href=\"{{ pluginCssPath }}?_dc={{ 'now'|date('U') }}\">
        {% endfor %}
    </head>
    <body class=\"pimcore_version_11 {{ adminSettings['branding']['login_screen_invert_colors'] ? 'inverted' : '' }}\">
        <style>
            #background {
                background-image: url(\"{{ pimcore_login_background_image('/bundles/pimcoreadmin/img/login/pimconaut2024.jpg') }}\");
            }
        </style>

        {% set customColor = adminSettings['branding']['color_login_screen'] %}
        {% if (customColor is not empty) %}
        <style>
            #content button {
                background: {{ customColor }};
            }

            #content a {
                color: {{ customColor }};
            }
        </style>
        {% endif %}

        <div id=\"logo\">
            <img alt=\"{{ \"Pimcore's logotype\"|trans([], 'admin') }}\" src=\"{{ path('pimcore_settings_display_custom_logo') ~ (adminSettings['branding']['login_screen_invert_colors'] ? '' : '?white=true') }}\">
        </div>

        <div id=\"content\">
            {{ block('content') }}
        </div>

        {% if debug is defined and debug %}
            <div id=\"github\">
                <a class=\"github-button\" href=\"https://github.com/pimcore/pimcore\" data-color-scheme=\"no-preference: dark; light: dark; dark: dark;\" data-size=\"large\" aria-label=\"Star pimcore/pimcore on GitHub\">Star</a>
            </div>
            <script async defer src=\"https://buttons.github.io/buttons.js\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>
        {% endif %}

        {#
            <div id=\"news\">
                <h2>News</h2>
                <hr>
                <p>
                    <a href=\"#\">Where is Master Data Management Heading in the Future?</a>
                </p>
                <hr>
                <p>
                    <a href=\"#\">Print and Pimcore announce technology partnership to ease publishing workflows</a>
                </p>
            </div>
        #}

        <div id=\"contentBackground\"></div>
        <div id=\"background\"></div>
        <div id=\"footer\">
            &copy; 2009-{{ \"now\"|date(\"Y\") }} <a href=\"http://www.pimcore.org/\">Pimcore GmbH</a><br>
            BE RESPECTFUL AND HONOR OUR WORK FOR FREE & OPEN SOURCE SOFTWARE BY NOT REMOVING OUR COPYRIGHT NOTICE!
            KEEP IN MIND THAT REMOVING THE COPYRIGHT NOTICE IS VIOLATING OUR LICENSING TERMS!
        </div>

        {% if block('below_footer') is defined %}
            {{ block('below_footer') }}
        {% endif %}

    </body>
</html>
", "@PimcoreAdmin/admin/login/layout.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/login/layout.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["for" => 13, "set" => 24, "if" => 25];
        static $filters = ["escape" => 14, "date" => 14, "trans" => 38, "raw" => 49];
        static $functions = ["pimcore_login_background_image" => 20, "path" => 38];

        try {
            $this->sandbox->checkSecurity(
                ['for', 'set', 'if'],
                ['escape', 'date', 'trans', 'raw'],
                ['pimcore_login_background_image', 'path'],
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
