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

/* @PimcoreAdmin/admin/login/deeplink.html.twig */
class __TwigTemplate_7d01343173c87250acc24b8031a71812 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/login/deeplink.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/login/deeplink.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html>
    <head>
        <script src=\"/bundles/pimcoreadmin/js/pimcore/common.js\"></script>
        <script src=\"/bundles/pimcoreadmin/js/pimcore/functions.js\"></script>
        <script src=\"/bundles/pimcoreadmin/js/pimcore/helpers.js\"></script>
        <script ";
        // line 7
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 7, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 7), 7, $this->source);
        yield ">
            ";
        // line 8
        if ((isset($context["tab"]) || array_key_exists("tab", $context) ? $context["tab"] : (function () { throw new RuntimeError('Variable "tab" does not exist.', 8, $this->source); })())) {
            // line 9
            yield "                pimcore.helpers.clearOpenTab();
                pimcore.helpers.rememberOpenTab(\"";
            // line 10
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["tab"]) || array_key_exists("tab", $context) ? $context["tab"] : (function () { throw new RuntimeError('Variable "tab" does not exist.', 10, $this->source); })()), 10, $this->source), "html", null, true);
            yield "\", true);
            ";
        }
        // line 12
        yield "            window.location.href = \"";
        yield $this->sandbox->ensureToStringAllowed((isset($context["redirect"]) || array_key_exists("redirect", $context) ? $context["redirect"] : (function () { throw new RuntimeError('Variable "redirect" does not exist.', 12, $this->source); })()), 12, $this->source);
        yield "\";
        </script>
    </head>
    <body>
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
        return "@PimcoreAdmin/admin/login/deeplink.html.twig";
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
        return array (  72 => 12,  67 => 10,  64 => 9,  62 => 8,  58 => 7,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html>
    <head>
        <script src=\"/bundles/pimcoreadmin/js/pimcore/common.js\"></script>
        <script src=\"/bundles/pimcoreadmin/js/pimcore/functions.js\"></script>
        <script src=\"/bundles/pimcoreadmin/js/pimcore/helpers.js\"></script>
        <script {{ pimcore_csp.getNonceHtmlAttribute()|raw }}>
            {% if tab %}
                pimcore.helpers.clearOpenTab();
                pimcore.helpers.rememberOpenTab(\"{{ tab }}\", true);
            {% endif %}
            window.location.href = \"{{ redirect | raw }}\";
        </script>
    </head>
    <body>
    </body>
</html>
", "@PimcoreAdmin/admin/login/deeplink.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/login/deeplink.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["if" => 8];
        static $filters = ["raw" => 7, "escape" => 10];
        static $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                ['raw', 'escape'],
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
