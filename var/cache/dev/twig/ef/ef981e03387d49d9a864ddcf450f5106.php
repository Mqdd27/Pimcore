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

/* @WebProfiler/Profiler/_request_summary.html.twig */
class __TwigTemplate_71d5b96f19cb5377b1fdd9b585f9fa66 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@WebProfiler/Profiler/_request_summary.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@WebProfiler/Profiler/_request_summary.html.twig"));

        // line 1
        $context["status_code"] = (((isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 1, $this->source); })())) ? (((CoreExtension::getAttribute($this->env, $this->source, ($context["request_collector"] ?? null), "statuscode", [], "any", true, true, true, 1)) ? (Twig\Extension\CoreExtension::default($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 1, $this->source); })()), "statuscode", [], "any", false, false, true, 1), 1, $this->source), 0)) : (0))) : (0));
        // line 2
        $context["css_class"] = ((((isset($context["status_code"]) || array_key_exists("status_code", $context) ? $context["status_code"] : (function () { throw new RuntimeError('Variable "status_code" does not exist.', 2, $this->source); })()) > 399)) ? ("status-error") : (((((isset($context["status_code"]) || array_key_exists("status_code", $context) ? $context["status_code"] : (function () { throw new RuntimeError('Variable "status_code" does not exist.', 2, $this->source); })()) > 299)) ? ("status-warning") : ("status-success"))));
        // line 3
        yield "
";
        // line 4
        if (((isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 4, $this->source); })()) && CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 4, $this->source); })()), "redirect", [], "any", false, false, true, 4))) {
            // line 5
            yield "    ";
            $context["redirect"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 5, $this->source); })()), "redirect", [], "any", false, false, true, 5);
            // line 6
            yield "    ";
            $context["link_to_source_code"] = ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["redirect"] ?? null), "controller", [], "any", false, true, true, 6), "class", [], "any", true, true, true, 6)) ? ($this->extensions['Symfony\Bridge\Twig\Extension\CodeExtension']->getFileLink($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["redirect"]) || array_key_exists("redirect", $context) ? $context["redirect"] : (function () { throw new RuntimeError('Variable "redirect" does not exist.', 6, $this->source); })()), "controller", [], "any", false, false, true, 6), "file", [], "any", false, false, true, 6), 6, $this->source), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["redirect"]) || array_key_exists("redirect", $context) ? $context["redirect"] : (function () { throw new RuntimeError('Variable "redirect" does not exist.', 6, $this->source); })()), "controller", [], "any", false, false, true, 6), "line", [], "any", false, false, true, 6), 6, $this->source))) : (""));
            // line 7
            yield "    ";
            $context["redirect_route_name"] = ("@" . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["redirect"]) || array_key_exists("redirect", $context) ? $context["redirect"] : (function () { throw new RuntimeError('Variable "redirect" does not exist.', 7, $this->source); })()), "route", [], "any", false, false, true, 7), 7, $this->source));
            // line 8
            yield "
    <div class=\"status status-compact status-warning\">
        <span class=\"icon icon-redirect\">";
            // line 10
            yield Twig\Extension\CoreExtension::source($this->env, "@WebProfiler/Icon/redirect.svg");
            yield "</span>

        <span class=\"status-response-status-code\">";
            // line 12
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["redirect"]) || array_key_exists("redirect", $context) ? $context["redirect"] : (function () { throw new RuntimeError('Variable "redirect" does not exist.', 12, $this->source); })()), "status_code", [], "any", false, false, true, 12), 12, $this->source), "html", null, true);
            yield "</span> redirect from

        <span class=\"status-request-method\">";
            // line 14
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["redirect"]) || array_key_exists("redirect", $context) ? $context["redirect"] : (function () { throw new RuntimeError('Variable "redirect" does not exist.', 14, $this->source); })()), "method", [], "any", false, false, true, 14), 14, $this->source), "html", null, true);
            yield "</span>

        ";
            // line 16
            if ((isset($context["link_to_source_code"]) || array_key_exists("link_to_source_code", $context) ? $context["link_to_source_code"] : (function () { throw new RuntimeError('Variable "link_to_source_code" does not exist.', 16, $this->source); })())) {
                // line 17
                yield "            <a href=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["link_to_source_code"]) || array_key_exists("link_to_source_code", $context) ? $context["link_to_source_code"] : (function () { throw new RuntimeError('Variable "link_to_source_code" does not exist.', 17, $this->source); })()), 17, $this->source), "html", null, true);
                yield "\" title=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["redirect"]) || array_key_exists("redirect", $context) ? $context["redirect"] : (function () { throw new RuntimeError('Variable "redirect" does not exist.', 17, $this->source); })()), "controller", [], "any", false, false, true, 17), "file", [], "any", false, false, true, 17), 17, $this->source), "html", null, true);
                yield "\">";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["redirect_route_name"]) || array_key_exists("redirect_route_name", $context) ? $context["redirect_route_name"] : (function () { throw new RuntimeError('Variable "redirect_route_name" does not exist.', 17, $this->source); })()), 17, $this->source), "html", null, true);
                yield "</a>
        ";
            } else {
                // line 19
                yield "            ";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["redirect_route_name"]) || array_key_exists("redirect_route_name", $context) ? $context["redirect_route_name"] : (function () { throw new RuntimeError('Variable "redirect_route_name" does not exist.', 19, $this->source); })()), 19, $this->source), "html", null, true);
                yield "
        ";
            }
            // line 21
            yield "
        (<a href=\"";
            // line 22
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("_profiler", ["token" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["redirect"]) || array_key_exists("redirect", $context) ? $context["redirect"] : (function () { throw new RuntimeError('Variable "redirect" does not exist.', 22, $this->source); })()), "token", [], "any", false, false, true, 22), 22, $this->source), "panel" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["request"]) || array_key_exists("request", $context) ? $context["request"] : (function () { throw new RuntimeError('Variable "request" does not exist.', 22, $this->source); })()), "query", [], "any", false, false, true, 22), "get", ["panel", "request"], "method", false, false, true, 22), 22, $this->source)]), "html", null, true);
            yield "\">";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["redirect"]) || array_key_exists("redirect", $context) ? $context["redirect"] : (function () { throw new RuntimeError('Variable "redirect" does not exist.', 22, $this->source); })()), "token", [], "any", false, false, true, 22), 22, $this->source), "html", null, true);
            yield "</a>)
    </div>
";
        }
        // line 25
        yield "
<div class=\"status ";
        // line 26
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["css_class"]) || array_key_exists("css_class", $context) ? $context["css_class"] : (function () { throw new RuntimeError('Variable "css_class" does not exist.', 26, $this->source); })()), 26, $this->source), "html", null, true);
        yield "\">
    ";
        // line 27
        if (((isset($context["status_code"]) || array_key_exists("status_code", $context) ? $context["status_code"] : (function () { throw new RuntimeError('Variable "status_code" does not exist.', 27, $this->source); })()) > 399)) {
            // line 28
            yield "        <p class=\"status-error-details\">
            <span class=\"icon\">";
            // line 29
            yield Twig\Extension\CoreExtension::source($this->env, "@WebProfiler/Icon/alert-circle.svg");
            yield "</span>
            <span class=\"status-response-status-code\">Error ";
            // line 30
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["status_code"]) || array_key_exists("status_code", $context) ? $context["status_code"] : (function () { throw new RuntimeError('Variable "status_code" does not exist.', 30, $this->source); })()), 30, $this->source), "html", null, true);
            yield "</span>
            <span class=\"status-response-status-text\">";
            // line 31
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 31, $this->source); })()), "statusText", [], "any", false, false, true, 31), 31, $this->source), "html", null, true);
            yield "</span>
        </p>
    ";
        }
        // line 34
        yield "
    <h2>
        <span class=\"status-request-method\">
            ";
        // line 37
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::upper($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 37, $this->source); })()), "method", [], "any", false, false, true, 37), 37, $this->source)), "html", null, true);
        yield "
        </span>

        ";
        // line 40
        $context["profile_title"] = (((Twig\Extension\CoreExtension::length($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 40, $this->source); })()), "url", [], "any", false, false, true, 40), 40, $this->source)) < 160)) ? (CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 40, $this->source); })()), "url", [], "any", false, false, true, 40)) : ((Twig\Extension\CoreExtension::slice($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 40, $this->source); })()), "url", [], "any", false, false, true, 40), 40, $this->source), 0, 160) . "…")));
        // line 41
        yield "        ";
        if (CoreExtension::inFilter(Twig\Extension\CoreExtension::upper($this->env->getCharset(), CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 41, $this->source); })()), "method", [], "any", false, false, true, 41)), ["GET", "HEAD"])) {
            // line 42
            yield "            <a href=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 42, $this->source); })()), "url", [], "any", false, false, true, 42), 42, $this->source), "html", null, true);
            yield "\">";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["profile_title"]) || array_key_exists("profile_title", $context) ? $context["profile_title"] : (function () { throw new RuntimeError('Variable "profile_title" does not exist.', 42, $this->source); })()), 42, $this->source), "html", null, true);
            yield "</a>
        ";
        } else {
            // line 44
            yield "            ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["profile_title"]) || array_key_exists("profile_title", $context) ? $context["profile_title"] : (function () { throw new RuntimeError('Variable "profile_title" does not exist.', 44, $this->source); })()), 44, $this->source), "html", null, true);
            yield "
        ";
        }
        // line 46
        yield "    </h2>

    <dl class=\"metadata\">
        ";
        // line 49
        if (((isset($context["status_code"]) || array_key_exists("status_code", $context) ? $context["status_code"] : (function () { throw new RuntimeError('Variable "status_code" does not exist.', 49, $this->source); })()) < 400)) {
            // line 50
            yield "            <dt>Response</dt>
            <dd>
                <span class=\"status-response-status-code\">";
            // line 52
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["status_code"]) || array_key_exists("status_code", $context) ? $context["status_code"] : (function () { throw new RuntimeError('Variable "status_code" does not exist.', 52, $this->source); })()), 52, $this->source), "html", null, true);
            yield "</span>
                <span class=\"status-response-status-text\">";
            // line 53
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 53, $this->source); })()), "statusText", [], "any", false, false, true, 53), 53, $this->source), "html", null, true);
            yield "</span>
            </dd>
        ";
        }
        // line 56
        yield "
        ";
        // line 57
        $context["referer"] = (((isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 57, $this->source); })())) ? (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 57, $this->source); })()), "requestheaders", [], "any", false, false, true, 57), "get", ["referer"], "method", false, false, true, 57)) : (null));
        // line 58
        yield "        ";
        if ((isset($context["referer"]) || array_key_exists("referer", $context) ? $context["referer"] : (function () { throw new RuntimeError('Variable "referer" does not exist.', 58, $this->source); })())) {
            // line 59
            yield "            <dt></dt>
            <dd>
                <span class=\"icon icon-referer\">";
            // line 61
            yield Twig\Extension\CoreExtension::source($this->env, "@WebProfiler/Icon/referrer.svg");
            yield "</span>
                <a href=\"";
            // line 62
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["referer"]) || array_key_exists("referer", $context) ? $context["referer"] : (function () { throw new RuntimeError('Variable "referer" does not exist.', 62, $this->source); })()), 62, $this->source), "html", null, true);
            yield "\" class=\"referer\">Browse referrer URL</a>
            </dd>
        ";
        }
        // line 65
        yield "
        <dt>IP</dt>
        <dd>
            <a href=\"";
        // line 68
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("_profiler_search_results", ["token" => $this->sandbox->ensureToStringAllowed((isset($context["token"]) || array_key_exists("token", $context) ? $context["token"] : (function () { throw new RuntimeError('Variable "token" does not exist.', 68, $this->source); })()), 68, $this->source), "limit" => 10, "ip" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 68, $this->source); })()), "ip", [], "any", false, false, true, 68), 68, $this->source)]), "html", null, true);
        yield "\">";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 68, $this->source); })()), "ip", [], "any", false, false, true, 68), 68, $this->source), "html", null, true);
        yield "</a>
        </dd>

        <dt>Profiled on</dt>
        <dd><time data-convert-to-user-timezone data-render-as-datetime datetime=\"";
        // line 72
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 72, $this->source); })()), "time", [], "any", false, false, true, 72), 72, $this->source), "c"), "html", null, true);
        yield "\">";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 72, $this->source); })()), "time", [], "any", false, false, true, 72), 72, $this->source), "r"), "html", null, true);
        yield "</time></dd>

        <dt>Token</dt>
        <dd>";
        // line 75
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 75, $this->source); })()), "token", [], "any", false, false, true, 75), 75, $this->source), "html", null, true);
        yield "</dd>
    </dl>
</div>

";
        // line 79
        if (((isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 79, $this->source); })()) && CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 79, $this->source); })()), "forwardtoken", [], "any", false, false, true, 79))) {
            // line 80
            $context["forward_profile"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["profile"]) || array_key_exists("profile", $context) ? $context["profile"] : (function () { throw new RuntimeError('Variable "profile" does not exist.', 80, $this->source); })()), "childByToken", [CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 80, $this->source); })()), "forwardtoken", [], "any", false, false, true, 80)], "method", false, false, true, 80);
            // line 81
            yield "    ";
            $context["controller"] = (((isset($context["forward_profile"]) || array_key_exists("forward_profile", $context) ? $context["forward_profile"] : (function () { throw new RuntimeError('Variable "forward_profile" does not exist.', 81, $this->source); })())) ? (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["forward_profile"]) || array_key_exists("forward_profile", $context) ? $context["forward_profile"] : (function () { throw new RuntimeError('Variable "forward_profile" does not exist.', 81, $this->source); })()), "collector", ["request"], "method", false, false, true, 81), "controller", [], "any", false, false, true, 81)) : ("n/a"));
            // line 82
            yield "    <div class=\"status status-compact status-compact-forward\">
        <span class=\"icon icon-forward\">";
            // line 83
            yield Twig\Extension\CoreExtension::source($this->env, "@WebProfiler/Icon/forward.svg");
            yield "</span>

        Forwarded to

        ";
            // line 87
            $context["link"] = ((CoreExtension::getAttribute($this->env, $this->source, ($context["controller"] ?? null), "file", [], "any", true, true, true, 87)) ? ($this->extensions['Symfony\Bridge\Twig\Extension\CodeExtension']->getFileLink($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["controller"]) || array_key_exists("controller", $context) ? $context["controller"] : (function () { throw new RuntimeError('Variable "controller" does not exist.', 87, $this->source); })()), "file", [], "any", false, false, true, 87), 87, $this->source), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["controller"]) || array_key_exists("controller", $context) ? $context["controller"] : (function () { throw new RuntimeError('Variable "controller" does not exist.', 87, $this->source); })()), "line", [], "any", false, false, true, 87), 87, $this->source))) : (null));
            // line 88
            if ((isset($context["link"]) || array_key_exists("link", $context) ? $context["link"] : (function () { throw new RuntimeError('Variable "link" does not exist.', 88, $this->source); })())) {
                yield "<a href=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["link"]) || array_key_exists("link", $context) ? $context["link"] : (function () { throw new RuntimeError('Variable "link" does not exist.', 88, $this->source); })()), 88, $this->source), "html", null, true);
                yield "\" title=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["controller"]) || array_key_exists("controller", $context) ? $context["controller"] : (function () { throw new RuntimeError('Variable "controller" does not exist.', 88, $this->source); })()), "file", [], "any", false, false, true, 88), 88, $this->source), "html", null, true);
                yield "\">";
            }
            // line 89
            if (CoreExtension::getAttribute($this->env, $this->source, ($context["controller"] ?? null), "class", [], "any", true, true, true, 89)) {
                // line 90
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::striptags($this->extensions['Symfony\Bridge\Twig\Extension\CodeExtension']->abbrClass($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["controller"]) || array_key_exists("controller", $context) ? $context["controller"] : (function () { throw new RuntimeError('Variable "controller" does not exist.', 90, $this->source); })()), "class", [], "any", false, false, true, 90), 90, $this->source), "html", null, true))), "html", null, true);
                // line 91
                yield ((CoreExtension::getAttribute($this->env, $this->source, (isset($context["controller"]) || array_key_exists("controller", $context) ? $context["controller"] : (function () { throw new RuntimeError('Variable "controller" does not exist.', 91, $this->source); })()), "method", [], "any", false, false, true, 91)) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((" :: " . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["controller"]) || array_key_exists("controller", $context) ? $context["controller"] : (function () { throw new RuntimeError('Variable "controller" does not exist.', 91, $this->source); })()), "method", [], "any", false, false, true, 91), 91, $this->source)), "html", null, true)) : (""));
            } else {
                // line 93
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["controller"]) || array_key_exists("controller", $context) ? $context["controller"] : (function () { throw new RuntimeError('Variable "controller" does not exist.', 93, $this->source); })()), 93, $this->source), "html", null, true);
            }
            // line 95
            if ((isset($context["link"]) || array_key_exists("link", $context) ? $context["link"] : (function () { throw new RuntimeError('Variable "link" does not exist.', 95, $this->source); })())) {
                yield "</a>";
            }
            // line 96
            yield "        (<a href=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("_profiler", ["token" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 96, $this->source); })()), "forwardtoken", [], "any", false, false, true, 96), 96, $this->source)]), "html", null, true);
            yield "\">";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["request_collector"]) || array_key_exists("request_collector", $context) ? $context["request_collector"] : (function () { throw new RuntimeError('Variable "request_collector" does not exist.', 96, $this->source); })()), "forwardtoken", [], "any", false, false, true, 96), 96, $this->source), "html", null, true);
            yield "</a>)

    </div>";
        }
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "@WebProfiler/Profiler/_request_summary.html.twig";
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
        return array (  285 => 96,  281 => 95,  278 => 93,  275 => 91,  273 => 90,  271 => 89,  263 => 88,  261 => 87,  254 => 83,  251 => 82,  248 => 81,  246 => 80,  244 => 79,  237 => 75,  229 => 72,  220 => 68,  215 => 65,  209 => 62,  205 => 61,  201 => 59,  198 => 58,  196 => 57,  193 => 56,  187 => 53,  183 => 52,  179 => 50,  177 => 49,  172 => 46,  166 => 44,  158 => 42,  155 => 41,  153 => 40,  147 => 37,  142 => 34,  136 => 31,  132 => 30,  128 => 29,  125 => 28,  123 => 27,  119 => 26,  116 => 25,  108 => 22,  105 => 21,  99 => 19,  89 => 17,  87 => 16,  82 => 14,  77 => 12,  72 => 10,  68 => 8,  65 => 7,  62 => 6,  59 => 5,  57 => 4,  54 => 3,  52 => 2,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% set status_code = request_collector ? request_collector.statuscode|default(0) : 0 %}
{% set css_class = status_code > 399 ? 'status-error' : status_code > 299 ? 'status-warning' : 'status-success' %}

{% if request_collector and request_collector.redirect %}
    {% set redirect = request_collector.redirect %}
    {% set link_to_source_code = redirect.controller.class is defined ? redirect.controller.file|file_link(redirect.controller.line) %}
    {% set redirect_route_name = '@' ~ redirect.route %}

    <div class=\"status status-compact status-warning\">
        <span class=\"icon icon-redirect\">{{ source('@WebProfiler/Icon/redirect.svg') }}</span>

        <span class=\"status-response-status-code\">{{ redirect.status_code }}</span> redirect from

        <span class=\"status-request-method\">{{ redirect.method }}</span>

        {% if link_to_source_code %}
            <a href=\"{{ link_to_source_code }}\" title=\"{{ redirect.controller.file }}\">{{ redirect_route_name }}</a>
        {% else %}
            {{ redirect_route_name }}
        {% endif %}

        (<a href=\"{{ path('_profiler', { token: redirect.token, panel: request.query.get('panel', 'request') }) }}\">{{ redirect.token }}</a>)
    </div>
{% endif %}

<div class=\"status {{ css_class }}\">
    {% if status_code > 399 %}
        <p class=\"status-error-details\">
            <span class=\"icon\">{{ source('@WebProfiler/Icon/alert-circle.svg') }}</span>
            <span class=\"status-response-status-code\">Error {{ status_code }}</span>
            <span class=\"status-response-status-text\">{{ request_collector.statusText }}</span>
        </p>
    {% endif %}

    <h2>
        <span class=\"status-request-method\">
            {{ profile.method|upper }}
        </span>

        {% set profile_title = profile.url|length < 160 ? profile.url : profile.url[:160] ~ '…' %}
        {% if profile.method|upper in ['GET', 'HEAD'] %}
            <a href=\"{{ profile.url }}\">{{ profile_title }}</a>
        {% else %}
            {{ profile_title }}
        {% endif %}
    </h2>

    <dl class=\"metadata\">
        {% if status_code < 400 %}
            <dt>Response</dt>
            <dd>
                <span class=\"status-response-status-code\">{{ status_code }}</span>
                <span class=\"status-response-status-text\">{{ request_collector.statusText }}</span>
            </dd>
        {% endif %}

        {% set referer = request_collector ? request_collector.requestheaders.get('referer') : null %}
        {% if referer %}
            <dt></dt>
            <dd>
                <span class=\"icon icon-referer\">{{ source('@WebProfiler/Icon/referrer.svg') }}</span>
                <a href=\"{{ referer }}\" class=\"referer\">Browse referrer URL</a>
            </dd>
        {% endif %}

        <dt>IP</dt>
        <dd>
            <a href=\"{{ path('_profiler_search_results', { token: token, limit: 10, ip: profile.ip }) }}\">{{ profile.ip }}</a>
        </dd>

        <dt>Profiled on</dt>
        <dd><time data-convert-to-user-timezone data-render-as-datetime datetime=\"{{ profile.time|date('c') }}\">{{ profile.time|date('r') }}</time></dd>

        <dt>Token</dt>
        <dd>{{ profile.token }}</dd>
    </dl>
</div>

{% if request_collector and request_collector.forwardtoken -%}
    {% set forward_profile = profile.childByToken(request_collector.forwardtoken) %}
    {% set controller = forward_profile ? forward_profile.collector('request').controller : 'n/a' %}
    <div class=\"status status-compact status-compact-forward\">
        <span class=\"icon icon-forward\">{{ source('@WebProfiler/Icon/forward.svg') }}</span>

        Forwarded to

        {% set link = controller.file is defined ? controller.file|file_link(controller.line) : null -%}
        {%- if link %}<a href=\"{{ link }}\" title=\"{{ controller.file }}\">{% endif -%}
            {% if controller.class is defined %}
                {{- controller.class|abbr_class|striptags -}}
                {{- controller.method ? ' :: ' ~ controller.method -}}
            {% else %}
                {{- controller -}}
            {% endif %}
            {%- if link %}</a>{% endif %}
        (<a href=\"{{ path('_profiler', { token: request_collector.forwardtoken }) }}\">{{ request_collector.forwardtoken }}</a>)

    </div>
{%- endif %}
", "@WebProfiler/Profiler/_request_summary.html.twig", "/var/www/pimcore/vendor/symfony/web-profiler-bundle/Resources/views/Profiler/_request_summary.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 1, "if" => 4];
        static $filters = ["default" => 1, "file_link" => 6, "escape" => 12, "upper" => 37, "length" => 40, "slice" => 40, "date" => 72, "striptags" => 90, "abbr_class" => 90];
        static $functions = ["source" => 10, "path" => 22];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['default', 'file_link', 'escape', 'upper', 'length', 'slice', 'date', 'striptags', 'abbr_class'],
                ['source', 'path'],
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
