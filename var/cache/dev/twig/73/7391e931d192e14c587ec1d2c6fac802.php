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

/* @PimcoreAdmin/admin/asset/show_version_image.html.twig */
class __TwigTemplate_72ee7c0f94d7f16ce69f1b0d27b125ce extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/show_version_image.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/show_version_image.html.twig"));

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
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/bundles/pimcoreadmin/css/object_versions.css\"/>

</head>

<body>

";
        // line 31
        $context["tempFile"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 31, $this->source); })()), "getTemporaryFile", [], "method", false, false, true, 31);
        // line 32
        $context["dataUri"] = $this->extensions['Pimcore\Twig\Extension\HelpersExtension']->getImageVersionPreview($this->sandbox->ensureToStringAllowed((isset($context["tempFile"]) || array_key_exists("tempFile", $context) ? $context["tempFile"] : (function () { throw new RuntimeError('Variable "tempFile" does not exist.', 32, $this->source); })()), 32, $this->source));
        // line 33
        yield "
<table id=\"wrapper\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
    <tr>
        <td align=\"center\">
            <img src=\"";
        // line 37
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["dataUri"]) || array_key_exists("dataUri", $context) ? $context["dataUri"] : (function () { throw new RuntimeError('Variable "dataUri" does not exist.', 37, $this->source); })()), 37, $this->source), "html", null, true);
        yield "\"/>
              <table class=\"preview\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">
                    <tbody>
                        <tr class=\"odd\">
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>";
        // line 46
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 46, $this->source); })()), "getFileName", [], "method", false, false, true, 46), 46, $this->source), "html", null, true);
        yield "</td>
                        </tr>
                        <tr>
                            <td>Creation Date</td>
                            <td>";
        // line 50
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 50, $this->source); })()), "getCreationDate", [], "method", false, false, true, 50), 50, $this->source), "m/d/Y H:i:s"), "html", null, true);
        yield "</td>
                        </tr>
                        <tr>
                            <td>Modification Date</td>
                            <td>";
        // line 54
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 54, $this->source); })()), "getModificationDate", [], "method", false, false, true, 54), 54, $this->source), "m/d/Y H:i:s"), "html", null, true);
        yield "</td>
                        </tr>
                        <tr>
                            <td>File Size</td>
                            <td>";
        // line 58
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 58, $this->source); })()), "getFileSize", [true], "method", false, false, true, 58), 58, $this->source), "html", null, true);
        yield " </td>
                        </tr>
                        <tr>
                            <td>Mime Type</td>
                            <td>";
        // line 62
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 62, $this->source); })()), "getMimeType", [], "method", false, false, true, 62), 62, $this->source), "html", null, true);
        yield "</td>
                        </tr>
                        <tr>
                            <td>Dimensions</td>
                            <td>
                                ";
        // line 67
        if (is_iterable(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 67, $this->source); })()), "getDimensions", [], "method", false, false, true, 67))) {
            // line 68
            yield "                                    ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 68, $this->source); })()), "getDimensions", [], "method", false, false, true, 68), "width", [], "array", false, false, true, 68), 68, $this->source) . " X ") . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 68, $this->source); })()), "getDimensions", [], "method", false, false, true, 68), "height", [], "array", false, false, true, 68), 68, $this->source)), "html", null, true);
            yield "
                                ";
        }
        // line 70
        yield "                            </td>
                        </tr>
                        ";
        // line 72
        if (CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 72, $this->source); })()), "getHasMetadata", [], "method", false, false, true, 72)) {
            // line 73
            yield "                            ";
            $context["metaData"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 73, $this->source); })()), "getMetadata", [], "method", false, false, true, 73);
            // line 74
            yield "
                            ";
            // line 75
            if ((is_iterable((isset($context["metaData"]) || array_key_exists("metaData", $context) ? $context["metaData"] : (function () { throw new RuntimeError('Variable "metaData" does not exist.', 75, $this->source); })())) && (Twig\Extension\CoreExtension::length($this->env->getCharset(), (isset($context["metaData"]) || array_key_exists("metaData", $context) ? $context["metaData"] : (function () { throw new RuntimeError('Variable "metaData" does not exist.', 75, $this->source); })())) > 0))) {
                // line 76
                yield "                                ";
                $context['_parent'] = $context;
                $context['_seq'] = CoreExtension::ensureTraversable((isset($context["metaData"]) || array_key_exists("metaData", $context) ? $context["metaData"] : (function () { throw new RuntimeError('Variable "metaData" does not exist.', 76, $this->source); })()));
                foreach ($context['_seq'] as $context["_key"] => $context["data"]) {
                    // line 77
                    yield "                                    ";
                    $context["preview"] = CoreExtension::getAttribute($this->env, $this->source, $context["data"], "data", [], "array", false, false, true, 77);
                    // line 78
                    yield "                                    ";
                    $context["instance"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["loader"]) || array_key_exists("loader", $context) ? $context["loader"] : (function () { throw new RuntimeError('Variable "loader" does not exist.', 78, $this->source); })()), "build", [CoreExtension::getAttribute($this->env, $this->source, $context["data"], "type", [], "array", false, false, true, 78)], "method", false, false, true, 78);
                    // line 79
                    yield "                                    ";
                    $context["preview"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["instance"]) || array_key_exists("instance", $context) ? $context["instance"] : (function () { throw new RuntimeError('Variable "instance" does not exist.', 79, $this->source); })()), "getVersionPreview", [(isset($context["preview"]) || array_key_exists("preview", $context) ? $context["preview"] : (function () { throw new RuntimeError('Variable "preview" does not exist.', 79, $this->source); })()), $context["data"]], "method", false, false, true, 79);
                    // line 80
                    yield "
                                    <tr>
                                        <td>";
                    // line 82
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["data"], "name", [], "array", false, false, true, 82), 82, $this->source), "html", null, true);
                    yield " (";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["data"], "type", [], "array", false, false, true, 82), 82, $this->source), "html", null, true);
                    yield ")</td>
                                        <td>";
                    // line 83
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["preview"]) || array_key_exists("preview", $context) ? $context["preview"] : (function () { throw new RuntimeError('Variable "preview" does not exist.', 83, $this->source); })()), 83, $this->source), "html", null, true);
                    yield "</td>
                                    </tr>
                                ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_key'], $context['data'], $context['_parent']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 86
                yield "                            ";
            }
            // line 87
            yield "                        ";
        }
        // line 88
        yield "                    </tbody>
              </table>
        </td>
    </tr>
</table>

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
        return "@PimcoreAdmin/admin/asset/show_version_image.html.twig";
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
        return array (  201 => 88,  198 => 87,  195 => 86,  186 => 83,  180 => 82,  176 => 80,  173 => 79,  170 => 78,  167 => 77,  162 => 76,  160 => 75,  157 => 74,  154 => 73,  152 => 72,  148 => 70,  142 => 68,  140 => 67,  132 => 62,  125 => 58,  118 => 54,  111 => 50,  104 => 46,  92 => 37,  86 => 33,  84 => 32,  82 => 31,  50 => 1,);
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
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/bundles/pimcoreadmin/css/object_versions.css\"/>

</head>

<body>

{% set tempFile = asset.getTemporaryFile() %}
{% set dataUri = pimcore_image_version_preview(tempFile) %}

<table id=\"wrapper\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
    <tr>
        <td align=\"center\">
            <img src=\"{{ dataUri }}\"/>
              <table class=\"preview\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">
                    <tbody>
                        <tr class=\"odd\">
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{{ asset.getFileName() }}</td>
                        </tr>
                        <tr>
                            <td>Creation Date</td>
                            <td>{{ asset.getCreationDate()|date('m/d/Y H:i:s') }}</td>
                        </tr>
                        <tr>
                            <td>Modification Date</td>
                            <td>{{ asset.getModificationDate()|date('m/d/Y H:i:s') }}</td>
                        </tr>
                        <tr>
                            <td>File Size</td>
                            <td>{{ asset.getFileSize(true) }} </td>
                        </tr>
                        <tr>
                            <td>Mime Type</td>
                            <td>{{ asset.getMimeType() }}</td>
                        </tr>
                        <tr>
                            <td>Dimensions</td>
                            <td>
                                {% if asset.getDimensions() is iterable %}
                                    {{ asset.getDimensions()[\"width\"] ~ ' X ' ~ asset.getDimensions()[\"height\"] }}
                                {% endif %}
                            </td>
                        </tr>
                        {% if asset.getHasMetadata() %}
                            {% set metaData = asset.getMetadata() %}

                            {% if metaData is iterable and metaData|length > 0 %}
                                {% for data in metaData %}
                                    {% set preview = data[\"data\"] %}
                                    {% set instance = loader.build(data['type']) %}
                                    {% set preview = instance.getVersionPreview(preview,data) %}

                                    <tr>
                                        <td>{{ data['name'] }} ({{ data['type'] }})</td>
                                        <td>{{ preview }}</td>
                                    </tr>
                                {% endfor %}
                            {% endif %}
                        {% endif %}
                    </tbody>
              </table>
        </td>
    </tr>
</table>

</body>
</html>
", "@PimcoreAdmin/admin/asset/show_version_image.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/asset/show_version_image.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 31, "if" => 67, "for" => 76];
        static $filters = ["escape" => 37, "date" => 50, "length" => 75];
        static $functions = ["pimcore_image_version_preview" => 32];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'for'],
                ['escape', 'date', 'length'],
                ['pimcore_image_version_preview'],
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
