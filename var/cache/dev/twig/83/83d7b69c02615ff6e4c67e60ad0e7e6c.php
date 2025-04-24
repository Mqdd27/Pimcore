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

/* @PimcoreAdmin/admin/asset/get_preview_video_display.html.twig */
class __TwigTemplate_2add1850289e2be1f72eb627edb9f53a extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/get_preview_video_display.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/get_preview_video_display.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">

    <style type=\"text/css\">

        /* hide from ie on mac \\*/
        html {
            height: 100%;
            overflow: hidden;
        }
        /* end hide */

        body {
            height: 100%;
            margin: 0;
            padding: 0;
            background: #000;
        }

        #videoContainer {
            text-align: center;
            position: absolute;
            top:50%;
            margin-top: -200px;
            width: 100%;
        }

        video {

        }

    </style>

</head>

<body>

";
        // line 40
        $context["previewImage"] = "";
        // line 41
        if ((Pimcore\Video::isAvailable() && ((isset($context["config"]) || array_key_exists("config", $context) ? $context["config"] : (function () { throw new RuntimeError('Variable "config" does not exist.', 41, $this->source); })()) == "pimcore-system-treepreview"))) {
            // line 42
            yield "    ";
            $context["previewImage"] = $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_asset_getvideothumbnail", ["id" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 42, $this->source); })()), "getId", [], "method", false, false, true, 42), 42, $this->source), "treepreview" => "true"]);
        }
        // line 44
        yield "
";
        // line 45
        $context["serveVideoPreview"] = $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_asset_servevideopreview", ["id" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 45, $this->source); })()), "getId", [], "method", false, false, true, 45), 45, $this->source), "config" => $this->sandbox->ensureToStringAllowed((isset($context["config"]) || array_key_exists("config", $context) ? $context["config"] : (function () { throw new RuntimeError('Variable "config" does not exist.', 45, $this->source); })()), 45, $this->source)]);
        // line 46
        yield "
<div id=\"videoContainer\">
    <video id=\"video\" controls=\"controls\" height=\"400\" poster=\"";
        // line 48
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["previewImage"]) || array_key_exists("previewImage", $context) ? $context["previewImage"] : (function () { throw new RuntimeError('Variable "previewImage" does not exist.', 48, $this->source); })()), 48, $this->source), "html", null, true);
        yield "\">
        <source src=\"";
        // line 49
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["serveVideoPreview"]) || array_key_exists("serveVideoPreview", $context) ? $context["serveVideoPreview"] : (function () { throw new RuntimeError('Variable "serveVideoPreview" does not exist.', 49, $this->source); })()), 49, $this->source), "html", null, true);
        yield "\" type=\"video/mp4\" />
    </video>
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
        return "@PimcoreAdmin/admin/asset/get_preview_video_display.html.twig";
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
        return array (  112 => 49,  108 => 48,  104 => 46,  102 => 45,  99 => 44,  95 => 42,  93 => 41,  91 => 40,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">

    <style type=\"text/css\">

        /* hide from ie on mac \\*/
        html {
            height: 100%;
            overflow: hidden;
        }
        /* end hide */

        body {
            height: 100%;
            margin: 0;
            padding: 0;
            background: #000;
        }

        #videoContainer {
            text-align: center;
            position: absolute;
            top:50%;
            margin-top: -200px;
            width: 100%;
        }

        video {

        }

    </style>

</head>

<body>

{% set previewImage = '' %}
{% if pimcore_video_is_available() and config == \"pimcore-system-treepreview\" %}
    {% set previewImage = path('pimcore_admin_asset_getvideothumbnail', {id: asset.getId(), treepreview: 'true'}) %}
{% endif %}

{% set serveVideoPreview = path('pimcore_admin_asset_servevideopreview', {id: asset.getId(), config: config}) %}

<div id=\"videoContainer\">
    <video id=\"video\" controls=\"controls\" height=\"400\" poster=\"{{ previewImage }}\">
        <source src=\"{{ serveVideoPreview }}\" type=\"video/mp4\" />
    </video>
</div>


</body>
</html>
", "@PimcoreAdmin/admin/asset/get_preview_video_display.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/asset/get_preview_video_display.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 40, "if" => 41];
        static $filters = ["escape" => 48];
        static $functions = ["pimcore_video_is_available" => 41, "path" => 42];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['escape'],
                ['pimcore_video_is_available', 'path'],
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
