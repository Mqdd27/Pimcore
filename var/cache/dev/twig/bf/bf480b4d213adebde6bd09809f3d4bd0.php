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

/* @PimcoreCore/Workflow/NotificationEmail/notificationEmail.html.twig */
class __TwigTemplate_823d47225645a719d0a22c500d247260 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreCore/Workflow/NotificationEmail/notificationEmail.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreCore/Workflow/NotificationEmail/notificationEmail.html.twig"));

        // line 8
        yield "
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
</head>
<body>
";
        // line 15
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["translator"]) || array_key_exists("translator", $context) ? $context["translator"] : (function () { throw new RuntimeError('Variable "translator" does not exist.', 15, $this->source); })()), "trans", ["workflow_change_email_notification_text", [(($this->sandbox->ensureToStringAllowed((isset($context["subjectType"]) || array_key_exists("subjectType", $context) ? $context["subjectType"] : (function () { throw new RuntimeError('Variable "subjectType" does not exist.', 15, $this->source); })()), 15, $this->source) . " ") . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["subject"]) || array_key_exists("subject", $context) ? $context["subject"] : (function () { throw new RuntimeError('Variable "subject" does not exist.', 15, $this->source); })()), "getFullPath", [], "method", false, false, true, 15), 15, $this->source)), CoreExtension::getAttribute($this->env, $this->source, (isset($context["subject"]) || array_key_exists("subject", $context) ? $context["subject"] : (function () { throw new RuntimeError('Variable "subject" does not exist.', 15, $this->source); })()), "getId", [], "method", false, false, true, 15), CoreExtension::getAttribute($this->env, $this->source, (isset($context["translator"]) || array_key_exists("translator", $context) ? $context["translator"] : (function () { throw new RuntimeError('Variable "translator" does not exist.', 15, $this->source); })()), "trans", [(isset($context["action"]) || array_key_exists("action", $context) ? $context["action"] : (function () { throw new RuntimeError('Variable "action" does not exist.', 15, $this->source); })()), [], "admin", (isset($context["lang"]) || array_key_exists("lang", $context) ? $context["lang"] : (function () { throw new RuntimeError('Variable "lang" does not exist.', 15, $this->source); })())], "method", false, false, true, 15), CoreExtension::getAttribute($this->env, $this->source, (isset($context["translator"]) || array_key_exists("translator", $context) ? $context["translator"] : (function () { throw new RuntimeError('Variable "translator" does not exist.', 15, $this->source); })()), "trans", [CoreExtension::getAttribute($this->env, $this->source, (isset($context["workflow"]) || array_key_exists("workflow", $context) ? $context["workflow"] : (function () { throw new RuntimeError('Variable "workflow" does not exist.', 15, $this->source); })()), "getName", [], "method", false, false, true, 15), [], "admin", (isset($context["lang"]) || array_key_exists("lang", $context) ? $context["lang"] : (function () { throw new RuntimeError('Variable "lang" does not exist.', 15, $this->source); })())], "method", false, false, true, 15)], "admin", (isset($context["lang"]) || array_key_exists("lang", $context) ? $context["lang"] : (function () { throw new RuntimeError('Variable "lang" does not exist.', 15, $this->source); })())], "method", false, false, true, 15), 15, $this->source), "html", null, true);
        yield "<br>
";
        // line 16
        if ( !Twig\Extension\CoreExtension::testEmpty(Twig\Extension\CoreExtension::trim((isset($context["deeplink"]) || array_key_exists("deeplink", $context) ? $context["deeplink"] : (function () { throw new RuntimeError('Variable "deeplink" does not exist.', 16, $this->source); })())))) {
            // line 17
            yield "    <a href=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["deeplink"]) || array_key_exists("deeplink", $context) ? $context["deeplink"] : (function () { throw new RuntimeError('Variable "deeplink" does not exist.', 17, $this->source); })()), 17, $this->source), "html", null, true);
            yield "\" target=\"_blank\">";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["translator"]) || array_key_exists("translator", $context) ? $context["translator"] : (function () { throw new RuntimeError('Variable "translator" does not exist.', 17, $this->source); })()), "trans", ["workflow_change_email_notification_deeplink", [], "admin", (isset($context["lang"]) || array_key_exists("lang", $context) ? $context["lang"] : (function () { throw new RuntimeError('Variable "lang" does not exist.', 17, $this->source); })())], "method", false, false, true, 17), 17, $this->source), "html", null, true);
            yield "</a><br>
";
        }
        // line 19
        yield "<br>

";
        // line 21
        if ( !Twig\Extension\CoreExtension::testEmpty(Twig\Extension\CoreExtension::trim((isset($context["note_description"]) || array_key_exists("note_description", $context) ? $context["note_description"] : (function () { throw new RuntimeError('Variable "note_description" does not exist.', 21, $this->source); })())))) {
            // line 22
            yield "    <strong>";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["translator"]) || array_key_exists("translator", $context) ? $context["translator"] : (function () { throw new RuntimeError('Variable "translator" does not exist.', 22, $this->source); })()), "trans", ["workflow_change_email_notification_note", [], "admin", (isset($context["lang"]) || array_key_exists("lang", $context) ? $context["lang"] : (function () { throw new RuntimeError('Variable "lang" does not exist.', 22, $this->source); })())], "method", false, false, true, 22), 22, $this->source), "html", null, true);
            yield "</strong>
    <p>";
            // line 23
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["note_description"]) || array_key_exists("note_description", $context) ? $context["note_description"] : (function () { throw new RuntimeError('Variable "note_description" does not exist.', 23, $this->source); })()), 23, $this->source), "html", null, true);
            yield "</p>
";
        }
        // line 25
        yield "</body>
</html>";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "@PimcoreCore/Workflow/NotificationEmail/notificationEmail.html.twig";
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
        return array (  89 => 25,  84 => 23,  79 => 22,  77 => 21,  73 => 19,  65 => 17,  63 => 16,  59 => 15,  50 => 8,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{# @var subjectType string #}
{# @var subject AbstractElement #}
{# @var action string #}
{# @var deeplink string #}
{# @var note_description string #}
{# @var translator \\Symfony\\Contracts\\Translation\\TranslatorInterface #}
{# @var lang string #}

<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
</head>
<body>
{{ translator.trans('workflow_change_email_notification_text', [subjectType ~ ' ' ~ subject.getFullPath(), subject.getId(), translator.trans(action, [], 'admin', lang), translator.trans(workflow.getName(), [], 'admin', lang)], 'admin', lang) }}<br>
{% if deeplink|trim is not empty %}
    <a href=\"{{ deeplink }}\" target=\"_blank\">{{ translator.trans('workflow_change_email_notification_deeplink', [], 'admin', lang) }}</a><br>
{% endif %}
<br>

{% if note_description|trim is not empty %}
    <strong>{{ translator.trans('workflow_change_email_notification_note', [], 'admin', lang) }}</strong>
    <p>{{ note_description }}</p>
{% endif %}
</body>
</html>", "@PimcoreCore/Workflow/NotificationEmail/notificationEmail.html.twig", "/var/www/pimcore/vendor/pimcore/pimcore/bundles/CoreBundle/templates/Workflow/NotificationEmail/notificationEmail.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["if" => 16];
        static $filters = ["escape" => 15, "trim" => 16];
        static $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                ['escape', 'trim'],
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
