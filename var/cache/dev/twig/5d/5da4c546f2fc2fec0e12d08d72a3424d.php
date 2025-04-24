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

/* @PimcoreAdmin/admin/asset/get_preview_video_error.html.twig */
class __TwigTemplate_4ad6aba1ae8fc71b1d05a87f2e817261 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/get_preview_video_error.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/get_preview_video_error.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/bundles/pimcoreadmin/css/admin.css\"/>

    <style type=\"text/css\">

        /* hide from ie on mac \\*/
        html {
            height: 100%;
            overflow: hidden;
        }

        #wrapper {
            height: 100%;
        }

        /* end hide */

        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

    </style>

</head>

<body>

<table id=\"wrapper\" width=\"100%\" height=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
    <tr>
        <td class=\"error\" align=\"center\" valign=\"center\">
            ";
        // line 36
        if ((array_key_exists("thumbnail", $context) && (CoreExtension::getAttribute($this->env, $this->source, (isset($context["thumbnail"]) || array_key_exists("thumbnail", $context) ? $context["thumbnail"] : (function () { throw new RuntimeError('Variable "thumbnail" does not exist.', 36, $this->source); })()), "status", [], "array", false, false, true, 36) == "inprogress"))) {
            // line 37
            yield "                <style type=\"text/css\">
                    .pimcore_editable_video_progress {
                        position:relative;
                        background:#555 url(\"";
            // line 40
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 40, $this->source); })()), "getImageThumbnail", [["width" => 640]], "method", false, false, true, 40), 40, $this->source), "html", null, true);
            yield "\") no-repeat center center;
                        font-family:Arial,Verdana,sans-serif;
                        color:#fff;
                        text-shadow: 0 0 3px #000, 0 0 5px #000, 0 0 1px #000;
                    }
                    .pimcore_editable_video_progress_status {
                        font-size:16px;
                        color:#555;
                        font-family:Arial,Verdana,sans-serif;
                        line-height:66px;
                        background:#fff url(/bundles/pimcoreadmin/img/video-loading.gif) center center no-repeat;
                        width:66px;
                        height:66px;
                        padding:20px;
                        border:1px solid #555;
                        text-align:center;
                        box-shadow: 2px 2px 5px #333;
                        border-radius:20px;
                        top: 137px;
                        left: 267px;
                        position:absolute;
                        opacity: 0.8;
                        text-shadow: none;
                    }
                </style>
                <div class=\"pimcore_editable_video_progress\" style=\"width:640px; height:380px;\">

                    <br />
                    ";
            // line 68
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("video_preview_in_progress", [], "admin"), "html", null, true);
            yield "
                    <br />
                    ";
            // line 70
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("please_wait", [], "admin"), "html", null, true);
            yield "

                    <div class=\"pimcore_editable_video_progress_status\"></div>
                </div>


                <script ";
            // line 76
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 76, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 76), 76, $this->source);
            yield ">
                    window.setTimeout(function () {
                        location.reload();
                    }, 5000);
                </script>
            ";
        } elseif ( !Pimcore\Video::isAvailable()) {
            // line 82
            yield "                ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("preview_not_available", [], "admin"), "html", null, true);
            yield "
                <br />
                ";
            // line 84
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("php_cli_binary_and_or_ffmpeg_binary_setting_is_missing", [], "admin"), "html", null, true);
            yield "
            ";
        } else {
            // line 86
            yield "                ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("preview_not_available", [], "admin"), "html", null, true);
            yield "
                <br />
                Error unknown, please check the log files
            ";
        }
        // line 90
        yield "        </td>
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
        return "@PimcoreAdmin/admin/asset/get_preview_video_error.html.twig";
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
        return array (  167 => 90,  159 => 86,  154 => 84,  148 => 82,  139 => 76,  130 => 70,  125 => 68,  94 => 40,  89 => 37,  87 => 36,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/bundles/pimcoreadmin/css/admin.css\"/>

    <style type=\"text/css\">

        /* hide from ie on mac \\*/
        html {
            height: 100%;
            overflow: hidden;
        }

        #wrapper {
            height: 100%;
        }

        /* end hide */

        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

    </style>

</head>

<body>

<table id=\"wrapper\" width=\"100%\" height=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
    <tr>
        <td class=\"error\" align=\"center\" valign=\"center\">
            {% if thumbnail is defined and thumbnail[\"status\"] == \"inprogress\" %}
                <style type=\"text/css\">
                    .pimcore_editable_video_progress {
                        position:relative;
                        background:#555 url(\"{{ asset.getImageThumbnail({\"width\": 640}) }}\") no-repeat center center;
                        font-family:Arial,Verdana,sans-serif;
                        color:#fff;
                        text-shadow: 0 0 3px #000, 0 0 5px #000, 0 0 1px #000;
                    }
                    .pimcore_editable_video_progress_status {
                        font-size:16px;
                        color:#555;
                        font-family:Arial,Verdana,sans-serif;
                        line-height:66px;
                        background:#fff url(/bundles/pimcoreadmin/img/video-loading.gif) center center no-repeat;
                        width:66px;
                        height:66px;
                        padding:20px;
                        border:1px solid #555;
                        text-align:center;
                        box-shadow: 2px 2px 5px #333;
                        border-radius:20px;
                        top: 137px;
                        left: 267px;
                        position:absolute;
                        opacity: 0.8;
                        text-shadow: none;
                    }
                </style>
                <div class=\"pimcore_editable_video_progress\" style=\"width:640px; height:380px;\">

                    <br />
                    {{ 'video_preview_in_progress'|trans([],'admin') }}
                    <br />
                    {{ 'please_wait'|trans([],'admin') }}

                    <div class=\"pimcore_editable_video_progress_status\"></div>
                </div>


                <script {{ pimcore_csp.getNonceHtmlAttribute()|raw }}>
                    window.setTimeout(function () {
                        location.reload();
                    }, 5000);
                </script>
            {% elseif not pimcore_video_is_available() %}
                {{ 'preview_not_available'|trans([],'admin') }}
                <br />
                {{ 'php_cli_binary_and_or_ffmpeg_binary_setting_is_missing'|trans([],'admin') }}
            {% else %}
                {{ 'preview_not_available'|trans([],'admin') }}
                <br />
                Error unknown, please check the log files
            {% endif %}
        </td>
    </tr>
</table>


</body>
</html>
", "@PimcoreAdmin/admin/asset/get_preview_video_error.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/asset/get_preview_video_error.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["if" => 36];
        static $filters = ["escape" => 40, "trans" => 68, "raw" => 76];
        static $functions = ["pimcore_video_is_available" => 81];

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                ['escape', 'trans', 'raw'],
                ['pimcore_video_is_available'],
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
