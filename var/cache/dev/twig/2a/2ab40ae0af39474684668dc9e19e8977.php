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

/* @PimcoreAdmin/admin/login/two_factor_setup.html.twig */
class __TwigTemplate_3b9691ac81b667ab7f7f4dcceb167a8b extends Template
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
            'content' => [$this, 'block_content'],
            'below_footer' => [$this, 'block_below_footer'],
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doGetParent(array $context): bool|string|Template|TemplateWrapper
    {
        // line 1
        return "@PimcoreAdmin/admin/login/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/login/two_factor_setup.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/login/two_factor_setup.html.twig"));

        $this->parent = $this->loadTemplate("@PimcoreAdmin/admin/login/layout.html.twig", "@PimcoreAdmin/admin/login/two_factor_setup.html.twig", 1);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 3
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_content(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        // line 4
        yield "    ";
        if (array_key_exists("error", $context)) {
            // line 5
            yield "        <div class=\"text error\">
            ";
            // line 6
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans($this->sandbox->ensureToStringAllowed((isset($context["error"]) || array_key_exists("error", $context) ? $context["error"] : (function () { throw new RuntimeError('Variable "error" does not exist.', 6, $this->source); })()), 6, $this->source), [], "admin"), "html", null, true);
            yield "
        </div>
    ";
        } else {
            // line 9
            yield "        <div class=\"text info\">
            ";
            // line 10
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Enter your verification code", [], "admin"), "html", null, true);
            yield "
        </div>
    ";
        }
        // line 13
        yield "
    <div>
        <img src=\"";
        // line 15
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["image"]) || array_key_exists("image", $context) ? $context["image"] : (function () { throw new RuntimeError('Variable "image" does not exist.', 15, $this->source); })()), 15, $this->source), "html", null, true);
        yield "\"/>
        <p>";
        // line 16
        yield $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("2fa_alert_text", [], "admin");
        yield "</p>
    </div>

    <form method=\"post\" action=\"";
        // line 19
        yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_2fa_setup");
        yield "\">
        <input name=\"_auth_code\" id=\"_auth_code\" autocomplete=\"one-time-code\" type=\"password\" placeholder=\"";
        // line 20
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("2fa_code", [], "admin"), "html", null, true);
        yield "\" required autofocus>
        <input type=\"hidden\" name=\"csrfToken\" value=\"";
        // line 21
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csrf"]) || array_key_exists("pimcore_csrf", $context) ? $context["pimcore_csrf"] : (function () { throw new RuntimeError('Variable "pimcore_csrf" does not exist.', 21, $this->source); })()), "getCsrfToken", [CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 21, $this->source); })()), "request", [], "any", false, false, true, 21), "session", [], "any", false, false, true, 21)], "method", false, false, true, 21), 21, $this->source), "html", null, true);
        yield "\">

        <button type=\"submit\">";
        // line 23
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Login", [], "admin"), "html", null, true);
        yield "</button>
    </form>

    <form id=\"pimcore_logout_form\" method=\"post\" action=\"";
        // line 26
        yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_logout");
        yield "\">
        <input type=\"hidden\" name=\"csrfToken\" value=\"";
        // line 27
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csrf"]) || array_key_exists("pimcore_csrf", $context) ? $context["pimcore_csrf"] : (function () { throw new RuntimeError('Variable "pimcore_csrf" does not exist.', 27, $this->source); })()), "getCsrfToken", [CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 27, $this->source); })()), "request", [], "any", false, false, true, 27), "session", [], "any", false, false, true, 27)], "method", false, false, true, 27), 27, $this->source), "html", null, true);
        yield "\">
        <a id=\"pimcore_logout\" href=\"#\">";
        // line 28
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Back to Login", [], "admin"), "html", null, true);
        yield "</a>
    </form>



    ";
        // line 33
        yield $this->extensions['Pimcore\Twig\Extension\HelpersExtension']->breachAttackRandomContent();
        yield "
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 36
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_below_footer(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "below_footer"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "below_footer"));

        // line 37
        yield "    <script ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 37, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 37), 37, $this->source);
        yield ">
        document.getElementById('pimcore_logout').addEventListener('click', function () {
            document.getElementById('pimcore_logout_form').submit();
        });
    </script>
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
        return "@PimcoreAdmin/admin/login/two_factor_setup.html.twig";
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
        return array (  175 => 37,  162 => 36,  149 => 33,  141 => 28,  137 => 27,  133 => 26,  127 => 23,  122 => 21,  118 => 20,  114 => 19,  108 => 16,  104 => 15,  100 => 13,  94 => 10,  91 => 9,  85 => 6,  82 => 5,  79 => 4,  66 => 3,  43 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% extends '@PimcoreAdmin/admin/login/layout.html.twig' %}

{% block content %}
    {% if error is defined %}
        <div class=\"text error\">
            {{ error|trans([],'admin') }}
        </div>
    {% else %}
        <div class=\"text info\">
            {{ 'Enter your verification code'|trans([],'admin') }}
        </div>
    {% endif %}

    <div>
        <img src=\"{{ image }}\"/>
        <p>{{ '2fa_alert_text'|trans([], 'admin')|raw }}</p>
    </div>

    <form method=\"post\" action=\"{{ path('pimcore_admin_2fa_setup') }}\">
        <input name=\"_auth_code\" id=\"_auth_code\" autocomplete=\"one-time-code\" type=\"password\" placeholder=\"{{ '2fa_code'|trans([],'admin') }}\" required autofocus>
        <input type=\"hidden\" name=\"csrfToken\" value=\"{{ pimcore_csrf.getCsrfToken(app.request.session) }}\">

        <button type=\"submit\">{{ 'Login'|trans([],'admin') }}</button>
    </form>

    <form id=\"pimcore_logout_form\" method=\"post\" action=\"{{ path('pimcore_admin_logout') }}\">
        <input type=\"hidden\" name=\"csrfToken\" value=\"{{ pimcore_csrf.getCsrfToken(app.request.session) }}\">
        <a id=\"pimcore_logout\" href=\"#\">{{ 'Back to Login'|trans([],'admin') }}</a>
    </form>



    {{ pimcore_breach_attack_random_content() }}
{% endblock %}

{% block below_footer %}
    <script {{ pimcore_csp.getNonceHtmlAttribute()|raw }}>
        document.getElementById('pimcore_logout').addEventListener('click', function () {
            document.getElementById('pimcore_logout_form').submit();
        });
    </script>
{% endblock %}
", "@PimcoreAdmin/admin/login/two_factor_setup.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/login/two_factor_setup.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["extends" => 1, "if" => 4];
        static $filters = ["escape" => 6, "trans" => 6, "raw" => 16];
        static $functions = ["path" => 19, "pimcore_breach_attack_random_content" => 33];

        try {
            $this->sandbox->checkSecurity(
                ['extends', 'if'],
                ['escape', 'trans', 'raw'],
                ['path', 'pimcore_breach_attack_random_content'],
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
