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

/* @PimcoreAdmin/admin/asset/show_version_unknown.html.twig */
class __TwigTemplate_9509f2f06dbb5f9bc12a6c5ac3457cb7 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/show_version_unknown.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/show_version_unknown.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">

    <style type=\"text/css\">

        html, body, #wrapper {
            height: 100%;
            margin: 0;
            padding: 0;
            border: none;
            text-align: center;
        }

        #wrapper {
            margin: 0 auto;
            text-align: left;
            vertical-align: middle;
            width: 400px;
        }
    </style>
</head>
<body>

<table id=\"wrapper\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
    <tr>
        <td>
            ";
        // line 29
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("no_preview_available", [], "admin"), "html", null, true);
        yield "<br>
            ";
        // line 30
        $context["tempFile"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 30, $this->source); })()), "getTemporaryFile", [], "method", false, false, true, 30);
        // line 31
        yield "            ";
        $context["dataUri"] = $this->extensions['Pimcore\Twig\Extension\HelpersExtension']->getAssetVersionPreview($this->sandbox->ensureToStringAllowed((isset($context["tempFile"]) || array_key_exists("tempFile", $context) ? $context["tempFile"] : (function () { throw new RuntimeError('Variable "tempFile" does not exist.', 31, $this->source); })()), 31, $this->source));
        // line 32
        yield "
            <a href=\"";
        // line 33
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["dataUri"]) || array_key_exists("dataUri", $context) ? $context["dataUri"] : (function () { throw new RuntimeError('Variable "dataUri" does not exist.', 33, $this->source); })()), 33, $this->source), "html", null, true);
        yield "\" download=\"";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 33, $this->source); })()), "getFilename", [], "method", false, false, true, 33), 33, $this->source), "html", null, true);
        yield "\" id=\"download-version-link\">";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("download", [], "admin"), "html", null, true);
        yield "</a>
        </td>
    </tr>
</table>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        ";
        // line 40
        $context["filenamePrefix"] = Twig\Extension\CoreExtension::join(Twig\Extension\CoreExtension::slice($this->env->getCharset(), Twig\Extension\CoreExtension::split($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 40, $this->source); })()), "getFilename", [], "method", false, false, true, 40), 40, $this->source), "."), 0,  -1), ".");
        // line 41
        yield "        ";
        $context["filenameSuffix"] = Twig\Extension\CoreExtension::last($this->env->getCharset(), Twig\Extension\CoreExtension::split($this->env->getCharset(), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 41, $this->source); })()), "getFilename", [], "method", false, false, true, 41), 41, $this->source), "."));
        // line 42
        yield "        let versionDate = Ext.Date.format(new Date(";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((CoreExtension::getAttribute($this->env, $this->source, (isset($context["version"]) || array_key_exists("version", $context) ? $context["version"] : (function () { throw new RuntimeError('Variable "version" does not exist.', 42, $this->source); })()), "getDate", [], "method", false, false, true, 42) * 1000), "html", null, true);
        yield "), 'Y-m-d-H-i-s');
        document.getElementById('download-version-link').setAttribute('download', \"";
        // line 43
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["filenamePrefix"]) || array_key_exists("filenamePrefix", $context) ? $context["filenamePrefix"] : (function () { throw new RuntimeError('Variable "filenamePrefix" does not exist.', 43, $this->source); })()), 43, $this->source), "html", null, true);
        yield "-\" + versionDate + \".";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["filenameSuffix"]) || array_key_exists("filenameSuffix", $context) ? $context["filenameSuffix"] : (function () { throw new RuntimeError('Variable "filenameSuffix" does not exist.', 43, $this->source); })()), 43, $this->source), "html", null, true);
        yield "\");
    }, false);
</script>

<script src=\"/bundles/pimcoreadmin/js/../extjs/js/ext-all.js\" ";
        // line 47
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 47, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 47), 47, $this->source);
        yield "></script>
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
        return "@PimcoreAdmin/admin/asset/show_version_unknown.html.twig";
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
        return array (  125 => 47,  116 => 43,  111 => 42,  108 => 41,  106 => 40,  92 => 33,  89 => 32,  86 => 31,  84 => 30,  80 => 29,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">

    <style type=\"text/css\">

        html, body, #wrapper {
            height: 100%;
            margin: 0;
            padding: 0;
            border: none;
            text-align: center;
        }

        #wrapper {
            margin: 0 auto;
            text-align: left;
            vertical-align: middle;
            width: 400px;
        }
    </style>
</head>
<body>

<table id=\"wrapper\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
    <tr>
        <td>
            {{ 'no_preview_available'|trans([], 'admin') }}<br>
            {% set tempFile = asset.getTemporaryFile() %}
            {% set dataUri = pimcore_asset_version_preview(tempFile) %}

            <a href=\"{{ dataUri }}\" download=\"{{ asset.getFilename() }}\" id=\"download-version-link\">{{ 'download'|trans([],'admin') }}</a>
        </td>
    </tr>
</table>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        {% set filenamePrefix = asset.getFilename()|split('.')|slice(0,-1)|join('.') %}
        {% set filenameSuffix = asset.getFilename()|split('.')|last %}
        let versionDate = Ext.Date.format(new Date({{ version.getDate() * 1000 }}), 'Y-m-d-H-i-s');
        document.getElementById('download-version-link').setAttribute('download', \"{{ filenamePrefix }}-\" + versionDate + \".{{ filenameSuffix }}\");
    }, false);
</script>

<script src=\"/bundles/pimcoreadmin/js/../extjs/js/ext-all.js\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>
</body>
</html>
", "@PimcoreAdmin/admin/asset/show_version_unknown.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/asset/show_version_unknown.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 30];
        static $filters = ["escape" => 29, "trans" => 29, "join" => 40, "slice" => 40, "split" => 40, "last" => 41, "raw" => 47];
        static $functions = ["pimcore_asset_version_preview" => 31];

        try {
            $this->sandbox->checkSecurity(
                ['set'],
                ['escape', 'trans', 'join', 'slice', 'split', 'last', 'raw'],
                ['pimcore_asset_version_preview'],
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
