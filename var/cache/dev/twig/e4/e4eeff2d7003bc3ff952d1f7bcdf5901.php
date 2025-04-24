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

/* @PimcoreAdmin/admin/index/index.html.twig */
class __TwigTemplate_0dce936c5c83409740f8bea527e0603d extends Template
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
            'notification' => [$this, 'block_notification'],
            'avatar' => [$this, 'block_avatar'],
            'logout' => [$this, 'block_logout'],
            'stylesheets' => [$this, 'block_stylesheets'],
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/index/index.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/index/index.html.twig"));

        // line 1
        $context["language"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 1, $this->source); })()), "request", [], "any", false, false, true, 1), "locale", [], "any", false, false, true, 1);
        // line 3
        $context["userProxy"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 3, $this->source); })()), "user", [], "any", false, false, true, 3);
        // line 4
        $context["user"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["userProxy"]) || array_key_exists("userProxy", $context) ? $context["userProxy"] : (function () { throw new RuntimeError('Variable "userProxy" does not exist.', 4, $this->source); })()), "user", [], "any", false, false, true, 4);
        // line 5
        yield "
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <meta name=\"robots\" content=\"noindex, nofollow\"/>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\"/>
    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\"/>

    <link rel=\"icon\" type=\"image/png\" href=\"/bundles/pimcoreadmin/img/favicon/favicon-32x32.png\"/>
    <meta name=\"google\" value=\"notranslate\">

    <style type=\"text/css\">
        body {
            margin: 0;
            padding: 0;
            background: #fff;
        }

        #pimcore_loading {
            margin: 0 auto;
            width: 300px;
            padding: 300px 0 0 0;
            text-align: center;
        }

        .spinner {
            margin: 100px auto 0;
            width: 70px;
            text-align: center;
        }

        .spinner > div {
            width: 18px;
            height: 18px;
            background-color: #3d3d3d;

            border-radius: 100%;
            display: inline-block;
            -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        }

        .spinner .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
        }

        .spinner .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
        }

        @-webkit-keyframes sk-bouncedelay {
            0%, 80%, 100% {
                -webkit-transform: scale(0)
            }
            40% {
                -webkit-transform: scale(1.0)
            }
        }

        @keyframes sk-bouncedelay {
            0%, 80%, 100% {
                -webkit-transform: scale(0);
                transform: scale(0);
            }
            40% {
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
            }
        }

        #pimcore_panel_tabs-body {
            background-image: url(";
        // line 79
        yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_settings_display_custom_logo");
        yield ");
            ";
        // line 80
        if ( !(null === ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["adminSettings"] ?? null), "branding", [], "array", false, true, true, 80), "color_admin_interface_background", [], "array", true, true, true, 80)) ? (Twig\Extension\CoreExtension::default(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["adminSettings"]) || array_key_exists("adminSettings", $context) ? $context["adminSettings"] : (function () { throw new RuntimeError('Variable "adminSettings" does not exist.', 80, $this->source); })()), "branding", [], "array", false, false, true, 80), "color_admin_interface_background", [], "array", false, false, true, 80), null)) : (null)))) {
            // line 81
            yield "                background-color: ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["adminSettings"]) || array_key_exists("adminSettings", $context) ? $context["adminSettings"] : (function () { throw new RuntimeError('Variable "adminSettings" does not exist.', 81, $this->source); })()), "branding", [], "array", false, false, true, 81), "color_admin_interface_background", [], "array", false, false, true, 81), 81, $this->source), "html", null, true);
            yield ";
            ";
        }
        // line 83
        yield "            background-repeat: no-repeat;
            background-position: center center;
            background-size: 500px auto;
        }
    </style>

    <title>";
        // line 89
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 89, $this->source); })()), "hostname", [], "any", false, false, true, 89), 89, $this->source), "html", null, true);
        yield " :: Pimcore</title>

    <script ";
        // line 91
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 91, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 91), 91, $this->source);
        yield ">
        var pimcore = {}; // namespace

        // hide symfony toolbar by default
        var symfonyToolbarKey = 'symfony/profiler/toolbar/displayState';
        if(!window.localStorage.getItem(symfonyToolbarKey)) {
            window.localStorage.setItem(symfonyToolbarKey, 'none');
        }
    </script>

    <script src=\"";
        // line 101
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("bundles/fosjsrouting/js/router.js"), "html", null, true);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 101, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 101), 101, $this->source);
        yield "></script>
    <script src=\"";
        // line 102
        yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("fos_js_routing_js", ["callback" => "fos.Router.setData"]);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 102, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 102), 102, $this->source);
        yield "></script>

    ";
        // line 104
        yield $this->extensions['Symfony\WebpackEncoreBundle\Twig\EntryFilesTwigExtension']->renderWebpackScriptTags("admin", null, "pimcoreAdmin");
        yield "
    ";
        // line 105
        yield $this->extensions['Symfony\WebpackEncoreBundle\Twig\EntryFilesTwigExtension']->renderWebpackLinkTags("admin", null, "pimcoreAdmin");
        yield "
</head>

<body class=\"pimcore_version_11\" data-app-env=\"";
        // line 108
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 108, $this->source); })()), "environment", [], "any", false, false, true, 108), 108, $this->source), "html", null, true);
        yield "\">

<div id=\"pimcore_loading\">
    <div class=\"spinner\">
        <div class=\"bounce1\"></div>
        <div class=\"bounce2\"></div>
        <div class=\"bounce3\"></div>
    </div>
</div>
";
        // line 117
        $context["runtimePerspective"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["perspectiveConfig"]) || array_key_exists("perspectiveConfig", $context) ? $context["perspectiveConfig"] : (function () { throw new RuntimeError('Variable "perspectiveConfig" does not exist.', 117, $this->source); })()), "getRuntimePerspective", [(isset($context["user"]) || array_key_exists("user", $context) ? $context["user"] : (function () { throw new RuntimeError('Variable "user" does not exist.', 117, $this->source); })())], "method", false, false, true, 117);
        // line 118
        yield "
<div id=\"pimcore_sidebar\">
    <div id=\"pimcore_navigation\" style=\"display:none;\">
        <ul id=\"pimcore_navigation_ul\"></ul>
    </div>

    <div id=\"pimcore_status\"></div>

    ";
        // line 126
        yield from $this->unwrap()->yieldBlock('notification', $context, $blocks);
        // line 132
        yield "

    ";
        // line 134
        yield from $this->unwrap()->yieldBlock('avatar', $context, $blocks);
        // line 139
        yield "
    ";
        // line 140
        yield from $this->unwrap()->yieldBlock('logout', $context, $blocks);
        // line 149
        yield "
    <div id=\"pimcore_signet\" data-menu-tooltip=\"";
        // line 150
        yield ((CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 150, $this->source); })()), "platform_version", [], "any", false, false, true, 150)) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(("Pimcore Platform " . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 150, $this->source); })()), "platform_version", [], "any", false, false, true, 150), 150, $this->source)), "html", null, true)) : ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(("Pimcore Core Version " . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 150, $this->source); })()), "version", [], "any", false, false, true, 150), 150, $this->source)), "html", null, true)));
        yield "\" style=\"text-indent: -10000px\">
        BE RESPECTFUL AND HONOR OUR WORK FOR FREE & OPEN SOURCE SOFTWARE BY NOT REMOVING OUR LOGO.
        WE OFFER YOU THE POSSIBILITY TO ADDITIONALLY ADD YOUR OWN LOGO IN PIMCORE'S SYSTEM SETTINGS. THANK YOU!
    </div>
</div>

<div id=\"pimcore_tooltip\" style=\"display: none;\"></div>
<div id=\"pimcore_quicksearch\"></div>

";
        // line 160
        yield "
";
        // line 161
        yield from $this->unwrap()->yieldBlock('stylesheets', $context, $blocks);
        // line 184
        yield "
";
        // line 186
        yield "
";
        // line 187
        $context["debugSuffix"] = "";
        // line 188
        if (CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 188, $this->source); })()), "disableMinifyJs", [], "any", false, false, true, 188)) {
            // line 189
            yield "    ";
            $context["debugSuffix"] = "-debug";
        }
        // line 191
        yield "
";
        // line 193
        yield "
";
        // line 194
        $context["scriptLibs"] = ["lib/class.js", (("../extjs/js/ext-all" . $this->sandbox->ensureToStringAllowed(        // line 196
(isset($context["debugSuffix"]) || array_key_exists("debugSuffix", $context) ? $context["debugSuffix"] : (function () { throw new RuntimeError('Variable "debugSuffix" does not exist.', 196, $this->source); })()), 196, $this->source)) . ".js"), "lib/ext-plugins/portlet/PortalDropZone.js", "lib/ext-plugins/portlet/Portlet.js", "lib/ext-plugins/portlet/PortalColumn.js", "lib/ext-plugins/portlet/PortalPanel.js", "lib/ext-plugins/DragDropTag.js", "../build/admin/ace-builds/src-min-noconflict/ace.js", "../build/admin/ace-builds/src-min-noconflict/ext-modelist.js"];
        // line 205
        if ($this->env->getFunction('pimcore_file_exists')->getCallable()((((Twig\Extension\CoreExtension::constant("PIMCORE_WEB_ROOT") . "/bundles/pimcoreadmin/js/lib/ext-locale/locale-") . (isset($context["language"]) || array_key_exists("language", $context) ? $context["language"] : (function () { throw new RuntimeError('Variable "language" does not exist.', 205, $this->source); })())) . ".js"))) {
            // line 206
            yield "    ";
            $context["scriptLibs"] = Twig\Extension\CoreExtension::merge($this->sandbox->ensureToStringAllowed((isset($context["scriptLibs"]) || array_key_exists("scriptLibs", $context) ? $context["scriptLibs"] : (function () { throw new RuntimeError('Variable "scriptLibs" does not exist.', 206, $this->source); })()), 206, $this->source), [(("lib/ext-locale/locale-" . $this->sandbox->ensureToStringAllowed((isset($context["language"]) || array_key_exists("language", $context) ? $context["language"] : (function () { throw new RuntimeError('Variable "language" does not exist.', 206, $this->source); })()), 206, $this->source)) . ".js")]);
        }
        // line 208
        yield "
";
        // line 210
        yield "
";
        // line 211
        $context["scripts"] = ["pimcore/functions.js", "pimcore/common.js", "pimcore/elementservice.js", "pimcore/helpers.js", "pimcore/error.js", "pimcore/events.js", "pimcore/iconlibrary.js", "pimcore/treenodelocator.js", "pimcore/helpers/generic-grid.js", "pimcore/helpers/quantityValue.js", "pimcore/overrides.js", "pimcore/perspective.js", "pimcore/user.js", "pimcore/localeDateTime.js", "pimcore/tool/paralleljobs.js", "pimcore/tool/genericiframewindow.js", "pimcore/settings/user/panels/abstract.js", "pimcore/settings/user/panel.js", "pimcore/settings/user/usertab.js", "pimcore/settings/user/editorSettings.js", "pimcore/settings/user/websiteTranslationSettings.js", "pimcore/settings/user/role/panel.js", "pimcore/settings/user/role/tab.js", "pimcore/settings/user/user/objectrelations.js", "pimcore/settings/user/user/settings.js", "pimcore/settings/user/user/keyBindings.js", "pimcore/settings/user/workspaces.js", "pimcore/settings/user/workspace/asset.js", "pimcore/settings/user/workspace/document.js", "pimcore/settings/user/workspace/object.js", "pimcore/settings/user/workspace/customlayouts.js", "pimcore/settings/user/workspace/language.js", "pimcore/settings/user/workspace/special.js", "pimcore/settings/user/role/settings.js", "pimcore/settings/profile/panel.js", "pimcore/settings/profile/twoFactorSettings.js", "pimcore/settings/thumbnail/item.js", "pimcore/settings/thumbnail/panel.js", "pimcore/settings/videothumbnail/item.js", "pimcore/settings/videothumbnail/panel.js", "pimcore/settings/translation.js", "pimcore/settings/translationEditor.js", "pimcore/settings/translation/translationmerger.js", "pimcore/settings/translation/translationSettingsTab.js", "pimcore/settings/metadata/predefined.js", "pimcore/settings/properties/predefined.js", "pimcore/settings/docTypes.js", "pimcore/settings/system.js", "pimcore/settings/systemAppearance.js", "pimcore/settings/website.js", "pimcore/settings/recyclebin.js", "pimcore/settings/maintenance.js", "pimcore/settings/email/log.js", "pimcore/settings/email/blocklist.js", "pimcore/settings/gdpr/gdprPanel.js", "pimcore/settings/gdpr/dataproviders/assets.js", "pimcore/settings/gdpr/dataproviders/dataObjects.js", "pimcore/settings/gdpr/dataproviders/sentMail.js", "pimcore/settings/gdpr/dataproviders/pimcoreUsers.js", "pimcore/element/applicationLoggerPanelFacade.js", "pimcore/element/customReportsPanelFacade.js", "pimcore/element/selector/searchFacade.js", "pimcore/element/abstract.js", "pimcore/element/abstractPreview.js", "pimcore/element/properties.js", "pimcore/element/scheduler.js", "pimcore/element/dependencies.js", "pimcore/element/metainfo.js", "pimcore/element/history.js", "pimcore/element/notes.js", "pimcore/element/note_details.js", "pimcore/element/workflows.js", "pimcore/element/tag/imagecropper.js", "pimcore/element/tag/imagehotspotmarkereditor.js", "pimcore/element/replace_assignments.js", "pimcore/element/permissionchecker.js", "pimcore/element/gridexport/abstract.js", "pimcore/element/helpers/gridColumnConfig.js", "pimcore/element/helpers/gridConfigDialog.js", "pimcore/element/helpers/gridCellEditor.js", "pimcore/element/helpers/gridTabAbstract.js", "pimcore/object/helpers/grid.js", "pimcore/object/helpers/gridConfigDialog.js", "pimcore/object/helpers/classTree.js", "pimcore/object/helpers/gridTabAbstract.js", "pimcore/object/helpers/metadataMultiselectEditor.js", "pimcore/object/helpers/customLayoutEditor.js", "pimcore/object/helpers/optionEditor.js", "pimcore/object/helpers/imageGalleryDropZone.js", "pimcore/object/helpers/imageGalleryPanel.js", "pimcore/object/helpers/selectField.js", "pimcore/object/helpers/reservedWords.js", "pimcore/element/tag/configuration.js", "pimcore/element/tag/assignment.js", "pimcore/element/tag/tree.js", "pimcore/asset/helpers/metadataTree.js", "pimcore/asset/helpers/gridConfigDialog.js", "pimcore/asset/helpers/gridTabAbstract.js", "pimcore/asset/helpers/grid.js", "pimcore/document/properties.js", "pimcore/document/document.js", "pimcore/document/page_snippet.js", "pimcore/document/edit.js", "pimcore/document/versions.js", "pimcore/document/settings_abstract.js", "pimcore/document/pages/settings.js", "pimcore/document/pages/preview.js", "pimcore/document/snippets/settings.js", "pimcore/document/emails/settings.js", "pimcore/document/link.js", "pimcore/document/hardlink.js", "pimcore/document/folder.js", "pimcore/document/tree.js", "pimcore/document/snippet.js", "pimcore/document/email.js", "pimcore/document/page.js", "pimcore/document/document_language_overview.js", "pimcore/document/customviews/tree.js", "pimcore/asset/metadata/data/data.js", "pimcore/asset/metadata/data/input.js", "pimcore/asset/metadata/data/textarea.js", "pimcore/asset/metadata/data/asset.js", "pimcore/asset/metadata/data/document.js", "pimcore/asset/metadata/data/object.js", "pimcore/asset/metadata/data/date.js", "pimcore/asset/metadata/data/checkbox.js", "pimcore/asset/metadata/data/select.js", "pimcore/asset/metadata/tags/abstract.js", "pimcore/asset/metadata/tags/checkbox.js", "pimcore/asset/metadata/tags/date.js", "pimcore/asset/metadata/tags/input.js", "pimcore/asset/metadata/tags/manyToOneRelation.js", "pimcore/asset/metadata/tags/asset.js", "pimcore/asset/metadata/tags/document.js", "pimcore/asset/metadata/tags/object.js", "pimcore/asset/metadata/tags/select.js", "pimcore/asset/metadata/tags/textarea.js", "pimcore/asset/asset.js", "pimcore/asset/unknown.js", "pimcore/asset/embedded_meta_data.js", "pimcore/asset/image.js", "pimcore/asset/document.js", "pimcore/asset/archive.js", "pimcore/asset/video.js", "pimcore/asset/audio.js", "pimcore/asset/text.js", "pimcore/asset/folder.js", "pimcore/asset/listfolder.js", "pimcore/asset/versions.js", "pimcore/asset/metadata/dataProvider.js", "pimcore/asset/metadata/grid.js", "pimcore/asset/metadata/editor.js", "pimcore/asset/tree.js", "pimcore/asset/customviews/tree.js", "pimcore/asset/gridexport/csv.js", "pimcore/asset/gridexport/xlsx.js", "pimcore/object/helpers/edit.js", "pimcore/object/helpers/layout.js", "pimcore/object/classes/class.js", "pimcore/object/class.js", "pimcore/object/bulk-base.js", "pimcore/object/bulk-export.js", "pimcore/object/bulk-import.js", "pimcore/object/classes/data/data.js", "pimcore/object/classes/data/block.js", "pimcore/object/classes/data/classificationstore.js", "pimcore/object/classes/data/rgbaColor.js", "pimcore/object/classes/data/date.js", "pimcore/object/classes/data/datetime.js", "pimcore/object/classes/data/dateRange.js", "pimcore/object/classes/data/encryptedField.js", "pimcore/object/classes/data/time.js", "pimcore/object/classes/data/manyToOneRelation.js", "pimcore/object/classes/data/image.js", "pimcore/object/classes/data/externalImage.js", "pimcore/object/classes/data/hotspotimage.js", "pimcore/object/classes/data/imagegallery.js", "pimcore/object/classes/data/video.js", "pimcore/object/classes/data/input.js", "pimcore/object/classes/data/numeric.js", "pimcore/object/classes/data/numericRange.js", "pimcore/object/classes/data/manyToManyObjectRelation.js", "pimcore/object/classes/data/advancedManyToManyRelation.js", "pimcore/object/classes/data/advancedManyToManyObjectRelation.js", "pimcore/object/classes/data/reverseObjectRelation.js", "pimcore/object/classes/data/booleanSelect.js", "pimcore/object/classes/data/select.js", "pimcore/object/classes/data/urlSlug.js", "pimcore/object/classes/data/user.js", "pimcore/object/classes/data/textarea.js", "pimcore/object/classes/data/wysiwyg.js", "pimcore/object/classes/data/checkbox.js", "pimcore/object/classes/data/consent.js", "pimcore/object/classes/data/slider.js", "pimcore/object/classes/data/manyToManyRelation.js", "pimcore/object/classes/data/table.js", "pimcore/object/classes/data/structuredTable.js", "pimcore/object/classes/data/country.js", "pimcore/object/classes/data/geo/abstract.js", "pimcore/object/classes/data/geopoint.js", "pimcore/object/classes/data/geobounds.js", "pimcore/object/classes/data/geopolygon.js", "pimcore/object/classes/data/geopolyline.js", "pimcore/object/classes/data/language.js", "pimcore/object/classes/data/password.js", "pimcore/object/classes/data/multiselect.js", "pimcore/object/classes/data/link.js", "pimcore/object/classes/data/fieldcollections.js", "pimcore/object/classes/data/objectbricks.js", "pimcore/object/classes/data/localizedfields.js", "pimcore/object/classes/data/countrymultiselect.js", "pimcore/object/classes/data/languagemultiselect.js", "pimcore/object/classes/data/firstname.js", "pimcore/object/classes/data/lastname.js", "pimcore/object/classes/data/email.js", "pimcore/object/classes/data/gender.js", "pimcore/object/classes/data/quantityValue.js", "pimcore/object/classes/data/inputQuantityValue.js", "pimcore/object/classes/data/quantityValueRange.js", "pimcore/object/classes/data/calculatedValue.js", "pimcore/object/classes/layout/layout.js", "pimcore/object/classes/layout/accordion.js", "pimcore/object/classes/layout/fieldset.js", "pimcore/object/classes/layout/fieldcontainer.js", "pimcore/object/classes/layout/panel.js", "pimcore/object/classes/layout/region.js", "pimcore/object/classes/layout/tabpanel.js", "pimcore/object/classes/layout/iframe.js", "pimcore/object/fieldlookup/filterdialog.js", "pimcore/object/fieldlookup/helper.js", "pimcore/object/classes/layout/text.js", "pimcore/object/fieldcollection.js", "pimcore/object/fieldcollections/field.js", "pimcore/object/gridcolumn/Abstract.js", "pimcore/object/gridcolumn/operator/IsEqual.js", "pimcore/object/gridcolumn/operator/Text.js", "pimcore/object/gridcolumn/operator/Anonymizer.js", "pimcore/object/gridcolumn/operator/AnyGetter.js", "pimcore/object/gridcolumn/operator/AssetMetadataGetter.js", "pimcore/object/gridcolumn/operator/Arithmetic.js", "pimcore/object/gridcolumn/operator/Boolean.js", "pimcore/object/gridcolumn/operator/BooleanFormatter.js", "pimcore/object/gridcolumn/operator/CaseConverter.js", "pimcore/object/gridcolumn/operator/CharCounter.js", "pimcore/object/gridcolumn/operator/Concatenator.js", "pimcore/object/gridcolumn/operator/DateFormatter.js", "pimcore/object/gridcolumn/operator/ElementCounter.js", "pimcore/object/gridcolumn/operator/Iterator.js", "pimcore/object/gridcolumn/operator/JSON.js", "pimcore/object/gridcolumn/operator/LocaleSwitcher.js", "pimcore/object/gridcolumn/operator/Merge.js", "pimcore/object/gridcolumn/operator/ObjectFieldGetter.js", "pimcore/object/gridcolumn/operator/PHP.js", "pimcore/object/gridcolumn/operator/PHPCode.js", "pimcore/object/gridcolumn/operator/Base64.js", "pimcore/object/gridcolumn/operator/TranslateValue.js", "pimcore/object/gridcolumn/operator/PropertyGetter.js", "pimcore/object/gridcolumn/operator/RequiredBy.js", "pimcore/object/gridcolumn/operator/StringContains.js", "pimcore/object/gridcolumn/operator/StringReplace.js", "pimcore/object/gridcolumn/operator/Substring.js", "pimcore/object/gridcolumn/operator/LFExpander.js", "pimcore/object/gridcolumn/operator/Trimmer.js", "pimcore/object/gridcolumn/operator/Alias.js", "pimcore/object/gridcolumn/operator/WorkflowState.js", "pimcore/object/gridcolumn/value/DefaultValue.js", "pimcore/object/gridcolumn/operator/GeopointRenderer.js", "pimcore/object/gridcolumn/operator/ImageRenderer.js", "pimcore/object/gridcolumn/operator/HotspotimageRenderer.js", "pimcore/object/importcolumn/Abstract.js", "pimcore/object/importcolumn/operator/Base64.js", "pimcore/object/importcolumn/operator/Ignore.js", "pimcore/object/importcolumn/operator/Iterator.js", "pimcore/object/importcolumn/operator/LocaleSwitcher.js", "pimcore/object/importcolumn/operator/ObjectBrickSetter.js", "pimcore/object/importcolumn/operator/PHPCode.js", "pimcore/object/importcolumn/operator/Published.js", "pimcore/object/importcolumn/operator/Splitter.js", "pimcore/object/importcolumn/operator/Unserialize.js", "pimcore/object/importcolumn/value/DefaultValue.js", "pimcore/object/objectbrick.js", "pimcore/object/objectbricks/field.js", "pimcore/object/selectoptions.js", "pimcore/object/selectoptionsitems/definition.js", "pimcore/object/tags/abstract.js", "pimcore/object/tags/abstractRelations.js", "pimcore/object/tags/block.js", "pimcore/object/tags/rgbaColor.js", "pimcore/object/tags/date.js", "pimcore/object/tags/datetime.js", "pimcore/object/tags/dateRange.js", "pimcore/object/tags/time.js", "pimcore/object/tags/manyToOneRelation.js", "pimcore/object/tags/image.js", "pimcore/object/tags/encryptedField.js", "pimcore/object/tags/externalImage.js", "pimcore/object/tags/hotspotimage.js", "pimcore/object/tags/imagegallery.js", "pimcore/object/tags/video.js", "pimcore/object/tags/input.js", "pimcore/object/tags/classificationstore.js", "pimcore/object/tags/numeric.js", "pimcore/object/tags/numericRange.js", "pimcore/object/tags/manyToManyObjectRelation.js", "pimcore/object/tags/advancedManyToManyRelation.js", "pimcore/object/gridcolumn/operator/FieldCollectionGetter.js", "pimcore/object/tags/advancedManyToManyObjectRelation.js", "pimcore/object/tags/reverseObjectRelation.js", "pimcore/object/tags/urlSlug.js", "pimcore/object/tags/booleanSelect.js", "pimcore/object/tags/select.js", "pimcore/object/tags/user.js", "pimcore/object/tags/checkbox.js", "pimcore/object/tags/consent.js", "pimcore/object/tags/textarea.js", "pimcore/object/tags/wysiwyg.js", "pimcore/object/tags/slider.js", "pimcore/object/tags/manyToManyRelation.js", "pimcore/object/tags/table.js", "pimcore/object/tags/structuredTable.js", "pimcore/object/tags/country.js", "pimcore/object/tags/geo/abstract.js", "pimcore/object/tags/geobounds.js", "pimcore/object/tags/geopoint.js", "pimcore/object/tags/geopolygon.js", "pimcore/object/tags/geopolyline.js", "pimcore/object/tags/language.js", "pimcore/object/tags/password.js", "pimcore/object/tags/multiselect.js", "pimcore/object/tags/link.js", "pimcore/object/tags/fieldcollections.js", "pimcore/object/tags/localizedfields.js", "pimcore/object/tags/countrymultiselect.js", "pimcore/object/tags/languagemultiselect.js", "pimcore/object/tags/objectbricks.js", "pimcore/object/tags/firstname.js", "pimcore/object/tags/lastname.js", "pimcore/object/tags/email.js", "pimcore/object/tags/gender.js", "pimcore/object/tags/quantityValue.js", "pimcore/object/tags/quantityValueRange.js", "pimcore/object/tags/inputQuantityValue.js", "pimcore/object/tags/calculatedValue.js", "pimcore/object/preview.js", "pimcore/object/versions.js", "pimcore/object/variantsTab.js", "pimcore/object/folder/search.js", "pimcore/object/edit.js", "pimcore/object/abstract.js", "pimcore/object/object.js", "pimcore/object/folder.js", "pimcore/object/variant.js", "pimcore/object/tree.js", "pimcore/object/layout/iframe.js", "pimcore/object/customviews/tree.js", "pimcore/object/quantityvalue/unitsettings.js", "pimcore/object/gridexport/csv.js", "pimcore/object/gridexport/xlsx.js", "pimcore/layout/portal.js", "pimcore/layout/portlets/abstract.js", "pimcore/layout/portlets/modifiedDocuments.js", "pimcore/layout/portlets/modifiedObjects.js", "pimcore/layout/portlets/modifiedAssets.js", "pimcore/layout/portlets/modificationStatistic.js", "pimcore/layout/menu.js", "pimcore/layout/toolbar.js", "pimcore/layout/treepanelmanager.js", "pimcore/document/seemode.js", "pimcore/object/classificationstore/groupsPanel.js", "pimcore/object/classificationstore/propertiesPanel.js", "pimcore/object/classificationstore/collectionsPanel.js", "pimcore/object/classificationstore/keyDefinitionWindow.js", "pimcore/object/classificationstore/keySelectionWindow.js", "pimcore/object/classificationstore/relationSelectionWindow.js", "pimcore/object/classificationstore/storeConfiguration.js", "pimcore/object/classificationstore/storeTree.js", "pimcore/object/classificationstore/columnConfigDialog.js", "pimcore/workflow/transitionPanel.js", "pimcore/workflow/transitions.js", "pimcore/workflow/transitions.js", "pimcore/colorpicker-overrides.js", "pimcore/notification/helper.js", "pimcore/notification/panel.js", "pimcore/notification/modal.js"];
        // line 623
        yield "
<!-- some javascript -->
";
        // line 626
        yield "<script ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 626, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 626), 626, $this->source);
        yield ">
    pimcore.settings = ";
        // line 627
        yield json_encode($this->sandbox->ensureToStringAllowed((isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 627, $this->source); })()), 627, $this->source), Twig\Extension\CoreExtension::constant("JSON_PRETTY_PRINT"));
        yield ";
</script>

<script src=\"";
        // line 630
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_misc_jsontranslationssystem", ["language" => $this->sandbox->ensureToStringAllowed((isset($context["language"]) || array_key_exists("language", $context) ? $context["language"] : (function () { throw new RuntimeError('Variable "language" does not exist.', 630, $this->source); })()), 630, $this->source), "_dc" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 630, $this->source); })()), "build", [], "any", false, false, true, 630), 630, $this->source)]), "html", null, true);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 630, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 630), 630, $this->source);
        yield "></script>
<script src=\"";
        // line 631
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_user_getcurrentuser", ["_dc" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 631, $this->source); })()), "build", [], "any", false, false, true, 631), 631, $this->source)]), "html", null, true);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 631, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 631), 631, $this->source);
        yield "></script>
<script src=\"";
        // line 632
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_misc_availablelanguages", ["_dc" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 632, $this->source); })()), "build", [], "any", false, false, true, 632), 632, $this->source)]), "html", null, true);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 632, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 632), 632, $this->source);
        yield "></script>

<!-- library scripts -->
";
        // line 635
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["scriptLibs"]) || array_key_exists("scriptLibs", $context) ? $context["scriptLibs"] : (function () { throw new RuntimeError('Variable "scriptLibs" does not exist.', 635, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["scriptUrl"]) {
            // line 636
            yield "    <script src=\"/bundles/pimcoreadmin/js/";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["scriptUrl"], 636, $this->source), "html", null, true);
            yield "?_dc=";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 636, $this->source); })()), "build", [], "any", false, false, true, 636), 636, $this->source), "html", null, true);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 636, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 636), 636, $this->source);
            yield "></script>
";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['scriptUrl'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 638
        yield "
<!-- internal scripts -->
";
        // line 640
        if (CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 640, $this->source); })()), "disableMinifyJs", [], "any", false, false, true, 640)) {
            // line 641
            yield "    ";
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable((isset($context["scripts"]) || array_key_exists("scripts", $context) ? $context["scripts"] : (function () { throw new RuntimeError('Variable "scripts" does not exist.', 641, $this->source); })()));
            foreach ($context['_seq'] as $context["_key"] => $context["scriptUrl"]) {
                // line 642
                yield "        <script src=\"/bundles/pimcoreadmin/js/";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["scriptUrl"], 642, $this->source), "html", null, true);
                yield "?_dc=";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 642, $this->source); })()), "build", [], "any", false, false, true, 642), 642, $this->source), "html", null, true);
                yield "\"></script>
    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_key'], $context['scriptUrl'], $context['_parent']);
            $context = array_intersect_key($context, $_parent) + $_parent;
        } else {
            // line 645
            yield "    ";
            yield $this->extensions['Pimcore\Bundle\AdminBundle\Twig\Extension\AdminExtension']->minimize($this->sandbox->ensureToStringAllowed((isset($context["scripts"]) || array_key_exists("scripts", $context) ? $context["scripts"] : (function () { throw new RuntimeError('Variable "scripts" does not exist.', 645, $this->source); })()), 645, $this->source));
            yield "
";
        }
        // line 647
        yield "
";
        // line 649
        yield "
";
        // line 653
        yield "
";
        // line 654
        $context["pluginDcValue"] = $this->extensions['Twig\Extension\CoreExtension']->formatDate("now", "U");
        // line 655
        if (CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 655, $this->source); })()), "disableMinifyJs", [], "any", false, false, true, 655)) {
            // line 656
            yield "    ";
            $context["pluginDcValue"] = 1;
        }
        // line 658
        yield "
<!-- bundle scripts -->
";
        // line 660
        if (CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 660, $this->source); })()), "disableMinifyJs", [], "any", false, false, true, 660)) {
            // line 661
            yield "    ";
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable((isset($context["pluginJsPaths"]) || array_key_exists("pluginJsPaths", $context) ? $context["pluginJsPaths"] : (function () { throw new RuntimeError('Variable "pluginJsPaths" does not exist.', 661, $this->source); })()));
            foreach ($context['_seq'] as $context["_key"] => $context["pluginJsPath"]) {
                // line 662
                yield "        <script src=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["pluginJsPath"], 662, $this->source), "html", null, true);
                yield "?_dc=";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["pluginDcValue"]) || array_key_exists("pluginDcValue", $context) ? $context["pluginDcValue"] : (function () { throw new RuntimeError('Variable "pluginDcValue" does not exist.', 662, $this->source); })()), 662, $this->source), "html", null, true);
                yield "\" ";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 662, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 662), 662, $this->source);
                yield "></script>
    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_key'], $context['pluginJsPath'], $context['_parent']);
            $context = array_intersect_key($context, $_parent) + $_parent;
        } else {
            // line 665
            yield "    ";
            yield $this->extensions['Pimcore\Bundle\AdminBundle\Twig\Extension\AdminExtension']->minimize($this->sandbox->ensureToStringAllowed((isset($context["pluginJsPaths"]) || array_key_exists("pluginJsPaths", $context) ? $context["pluginJsPaths"] : (function () { throw new RuntimeError('Variable "pluginJsPaths" does not exist.', 665, $this->source); })()), 665, $this->source));
            yield "
";
        }
        // line 667
        yield "
";
        // line 668
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["pluginCssPaths"]) || array_key_exists("pluginCssPaths", $context) ? $context["pluginCssPaths"] : (function () { throw new RuntimeError('Variable "pluginCssPaths" does not exist.', 668, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["pluginCssPath"]) {
            // line 669
            yield "    <link rel=\"stylesheet\" type=\"text/css\" href=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["pluginCssPath"], 669, $this->source), "html", null, true);
            yield "?_dc=";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["pluginDcValue"]) || array_key_exists("pluginDcValue", $context) ? $context["pluginDcValue"] : (function () { throw new RuntimeError('Variable "pluginDcValue" does not exist.', 669, $this->source); })()), 669, $this->source), "html", null, true);
            yield "\"/>
";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['pluginCssPath'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 671
        yield "
";
        // line 673
        yield "<script src=\"/bundles/pimcoreadmin/js/pimcore/startup.js?_dc=";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 673, $this->source); })()), "build", [], "any", false, false, true, 673), 673, $this->source), "html", null, true);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 673, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 673), 673, $this->source);
        yield "></script>
</body>
</html>
";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    // line 126
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_notification(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "notification"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "notification"));

        // line 127
        yield "        <div id=\"pimcore_notification\" data-menu-tooltip=\"";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("notifications", [], "admin"), "html", null, true);
        yield "\" class=\"pimcore_icon_comments\">
            <img src=\"/bundles/pimcoreadmin/img/material-icons/outline-sms-24px.svg\">
            <span id=\"notification_value\" style=\"display:none;\"></span>
        </div>
    ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 134
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_avatar(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "avatar"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "avatar"));

        // line 135
        yield "        <div id=\"pimcore_avatar\" style=\"display:none;\">
            <img src=\"";
        // line 136
        yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_user_getimage");
        yield "\" data-menu-tooltip=\"";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["user"]) || array_key_exists("user", $context) ? $context["user"] : (function () { throw new RuntimeError('Variable "user" does not exist.', 136, $this->source); })()), "name", [], "any", false, false, true, 136), 136, $this->source), "html", null, true);
        yield " | ";
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("my_profile", [], "admin"), "html", null, true);
        yield "\"/>
        </div>
    ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 140
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_logout(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "logout"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "logout"));

        // line 141
        yield "        <form id=\"pimcore_logout_form\" method=\"post\" action=\"";
        yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_logout");
        yield "\">
            <input type=\"hidden\" name=\"csrfToken\" value=\"";
        // line 142
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csrf"]) || array_key_exists("pimcore_csrf", $context) ? $context["pimcore_csrf"] : (function () { throw new RuntimeError('Variable "pimcore_csrf" does not exist.', 142, $this->source); })()), "getCsrfToken", [CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 142, $this->source); })()), "request", [], "any", false, false, true, 142), "session", [], "any", false, false, true, 142)], "method", false, false, true, 142), 142, $this->source), "html", null, true);
        yield "\">

            <a id=\"pimcore_logout\" data-menu-tooltip=\"";
        // line 144
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("logout", [], "admin"), "html", null, true);
        yield "\" href=\"#\" style=\"display: none\">
                <img src=\"/bundles/pimcoreadmin/img/material-icons/outline-logout-24px.svg\">
            </a>
        </form>
    ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 161
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_stylesheets(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        // line 162
        yield "
    ";
        // line 163
        $context["styles"] = [$this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_misc_admincss"), "/bundles/pimcoreadmin/css/icons.css", "/bundles/pimcoreadmin/extjs/css/PimcoreApp-all_1.css", "/bundles/pimcoreadmin/extjs/css/PimcoreApp-all_2.css", "/bundles/pimcoreadmin/css/admin.css"];
        // line 170
        yield "
    <!-- stylesheets -->
    <style type=\"text/css\">
        ";
        // line 178
        yield "        ";
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["styles"]) || array_key_exists("styles", $context) ? $context["styles"] : (function () { throw new RuntimeError('Variable "styles" does not exist.', 178, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["style"]) {
            // line 179
            yield "            @import url(\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["style"], 179, $this->source), "html", null, true);
            yield "?_dc=";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["settings"]) || array_key_exists("settings", $context) ? $context["settings"] : (function () { throw new RuntimeError('Variable "settings" does not exist.', 179, $this->source); })()), "build", [], "any", false, false, true, 179), 179, $this->source), "html", null, true);
            yield "\");
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['style'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 181
        yield "    </style>

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
        return "@PimcoreAdmin/admin/index/index.html.twig";
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
        return array (  601 => 181,  590 => 179,  585 => 178,  580 => 170,  578 => 163,  575 => 162,  562 => 161,  546 => 144,  541 => 142,  536 => 141,  523 => 140,  505 => 136,  502 => 135,  489 => 134,  472 => 127,  459 => 126,  441 => 673,  438 => 671,  427 => 669,  423 => 668,  420 => 667,  414 => 665,  400 => 662,  395 => 661,  393 => 660,  389 => 658,  385 => 656,  383 => 655,  381 => 654,  378 => 653,  375 => 649,  372 => 647,  366 => 645,  354 => 642,  349 => 641,  347 => 640,  343 => 638,  330 => 636,  326 => 635,  318 => 632,  312 => 631,  306 => 630,  300 => 627,  295 => 626,  291 => 623,  289 => 211,  286 => 210,  283 => 208,  279 => 206,  277 => 205,  275 => 196,  274 => 194,  271 => 193,  268 => 191,  264 => 189,  262 => 188,  260 => 187,  257 => 186,  254 => 184,  252 => 161,  249 => 160,  237 => 150,  234 => 149,  232 => 140,  229 => 139,  227 => 134,  223 => 132,  221 => 126,  211 => 118,  209 => 117,  197 => 108,  191 => 105,  187 => 104,  180 => 102,  174 => 101,  161 => 91,  156 => 89,  148 => 83,  142 => 81,  140 => 80,  136 => 79,  60 => 5,  58 => 4,  56 => 3,  54 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% set language = app.request.locale %}
{# @var \\Pimcore\\Security\\User\\User #}
{% set userProxy = app.user %}
{% set user = userProxy.user %}

<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <meta name=\"robots\" content=\"noindex, nofollow\"/>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\"/>
    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\"/>

    <link rel=\"icon\" type=\"image/png\" href=\"/bundles/pimcoreadmin/img/favicon/favicon-32x32.png\"/>
    <meta name=\"google\" value=\"notranslate\">

    <style type=\"text/css\">
        body {
            margin: 0;
            padding: 0;
            background: #fff;
        }

        #pimcore_loading {
            margin: 0 auto;
            width: 300px;
            padding: 300px 0 0 0;
            text-align: center;
        }

        .spinner {
            margin: 100px auto 0;
            width: 70px;
            text-align: center;
        }

        .spinner > div {
            width: 18px;
            height: 18px;
            background-color: #3d3d3d;

            border-radius: 100%;
            display: inline-block;
            -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        }

        .spinner .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
        }

        .spinner .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
        }

        @-webkit-keyframes sk-bouncedelay {
            0%, 80%, 100% {
                -webkit-transform: scale(0)
            }
            40% {
                -webkit-transform: scale(1.0)
            }
        }

        @keyframes sk-bouncedelay {
            0%, 80%, 100% {
                -webkit-transform: scale(0);
                transform: scale(0);
            }
            40% {
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
            }
        }

        #pimcore_panel_tabs-body {
            background-image: url({{ path('pimcore_settings_display_custom_logo') }});
            {% if adminSettings['branding']['color_admin_interface_background']|default(null) is not null %}
                background-color: {{ adminSettings['branding']['color_admin_interface_background'] }};
            {% endif %}
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 500px auto;
        }
    </style>

    <title>{{ settings.hostname }} :: Pimcore</title>

    <script {{ pimcore_csp.getNonceHtmlAttribute()|raw }}>
        var pimcore = {}; // namespace

        // hide symfony toolbar by default
        var symfonyToolbarKey = 'symfony/profiler/toolbar/displayState';
        if(!window.localStorage.getItem(symfonyToolbarKey)) {
            window.localStorage.setItem(symfonyToolbarKey, 'none');
        }
    </script>

    <script src=\"{{ asset('bundles/fosjsrouting/js/router.js') }}\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>
    <script src=\"{{ path('fos_js_routing_js', {'callback' : 'fos.Router.setData'}) }}\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>

    {{ encore_entry_script_tags('admin', null, 'pimcoreAdmin') }}
    {{ encore_entry_link_tags('admin', null, 'pimcoreAdmin') }}
</head>

<body class=\"pimcore_version_11\" data-app-env=\"{{ app.environment }}\">

<div id=\"pimcore_loading\">
    <div class=\"spinner\">
        <div class=\"bounce1\"></div>
        <div class=\"bounce2\"></div>
        <div class=\"bounce3\"></div>
    </div>
</div>
{% set runtimePerspective = perspectiveConfig.getRuntimePerspective(user) %}

<div id=\"pimcore_sidebar\">
    <div id=\"pimcore_navigation\" style=\"display:none;\">
        <ul id=\"pimcore_navigation_ul\"></ul>
    </div>

    <div id=\"pimcore_status\"></div>

    {% block notification %}
        <div id=\"pimcore_notification\" data-menu-tooltip=\"{{ \"notifications\"|trans([],'admin') }}\" class=\"pimcore_icon_comments\">
            <img src=\"/bundles/pimcoreadmin/img/material-icons/outline-sms-24px.svg\">
            <span id=\"notification_value\" style=\"display:none;\"></span>
        </div>
    {% endblock %}


    {% block avatar %}
        <div id=\"pimcore_avatar\" style=\"display:none;\">
            <img src=\"{{ path('pimcore_admin_user_getimage') }}\" data-menu-tooltip=\"{{ user.name }} | {{ 'my_profile'|trans([],'admin') }}\"/>
        </div>
    {% endblock %}

    {% block logout %}
        <form id=\"pimcore_logout_form\" method=\"post\" action=\"{{ path('pimcore_admin_logout') }}\">
            <input type=\"hidden\" name=\"csrfToken\" value=\"{{ pimcore_csrf.getCsrfToken(app.request.session) }}\">

            <a id=\"pimcore_logout\" data-menu-tooltip=\"{{ \"logout\"|trans([],'admin') }}\" href=\"#\" style=\"display: none\">
                <img src=\"/bundles/pimcoreadmin/img/material-icons/outline-logout-24px.svg\">
            </a>
        </form>
    {% endblock %}

    <div id=\"pimcore_signet\" data-menu-tooltip=\"{{ settings.platform_version ? 'Pimcore Platform ' ~ settings.platform_version : 'Pimcore Core Version ' ~ settings.version }}\" style=\"text-indent: -10000px\">
        BE RESPECTFUL AND HONOR OUR WORK FOR FREE & OPEN SOURCE SOFTWARE BY NOT REMOVING OUR LOGO.
        WE OFFER YOU THE POSSIBILITY TO ADDITIONALLY ADD YOUR OWN LOGO IN PIMCORE'S SYSTEM SETTINGS. THANK YOU!
    </div>
</div>

<div id=\"pimcore_tooltip\" style=\"display: none;\"></div>
<div id=\"pimcore_quicksearch\"></div>

{# define stylesheets #}

{% block stylesheets %}

    {% set styles = [
        path('pimcore_admin_misc_admincss'),
        \"/bundles/pimcoreadmin/css/icons.css\",
        \"/bundles/pimcoreadmin/extjs/css/PimcoreApp-all_1.css\",
        \"/bundles/pimcoreadmin/extjs/css/PimcoreApp-all_2.css\",
        \"/bundles/pimcoreadmin/css/admin.css\"
    ] %}

    <!-- stylesheets -->
    <style type=\"text/css\">
        {#
         # use @import here, because if IE9 CSS file limitations (31 files)
         # see also: http://blogs.telerik.com/blogs/posts/10-05-03/internet-explorer-css-limits.aspx
         # @import bypasses this problem in an elegant way
        #}
        {% for style in styles %}
            @import url(\"{{ style }}?_dc={{ settings.build }}\");
        {% endfor %}
    </style>

{% endblock %}

{# define scripts #}

{% set debugSuffix = '' %}
{% if settings.disableMinifyJs %}
    {% set debugSuffix = \"-debug\" %}
{% endif %}

{# SCRIPT LIBRARIES #}

{% set scriptLibs = [
    \"lib/class.js\",
    \"../extjs/js/ext-all\" ~ debugSuffix ~ \".js\",
    \"lib/ext-plugins/portlet/PortalDropZone.js\",
    \"lib/ext-plugins/portlet/Portlet.js\",
    \"lib/ext-plugins/portlet/PortalColumn.js\",
    \"lib/ext-plugins/portlet/PortalPanel.js\",
    \"lib/ext-plugins/DragDropTag.js\",
    \"../build/admin/ace-builds/src-min-noconflict/ace.js\",
    \"../build/admin/ace-builds/src-min-noconflict/ext-modelist.js\"
] %}
{% if pimcore_file_exists(constant('PIMCORE_WEB_ROOT') ~ '/bundles/pimcoreadmin/js/lib/ext-locale/locale-' ~ language ~ '.js') %}
    {% set scriptLibs = scriptLibs|merge(['lib/ext-locale/locale-' ~ language ~ '.js']) %}
{% endif %}

{# PIMCORE SCRIPTS #}

{% set scripts = [


    \"pimcore/functions.js\",
    \"pimcore/common.js\",
    \"pimcore/elementservice.js\",
    \"pimcore/helpers.js\",
    \"pimcore/error.js\",
    \"pimcore/events.js\",
    \"pimcore/iconlibrary.js\",
    \"pimcore/treenodelocator.js\",
    \"pimcore/helpers/generic-grid.js\",
    \"pimcore/helpers/quantityValue.js\",
    \"pimcore/overrides.js\",

    \"pimcore/perspective.js\",
    \"pimcore/user.js\",
    \"pimcore/localeDateTime.js\",

    \"pimcore/tool/paralleljobs.js\",
    \"pimcore/tool/genericiframewindow.js\",


    \"pimcore/settings/user/panels/abstract.js\",
    \"pimcore/settings/user/panel.js\",

    \"pimcore/settings/user/usertab.js\",
    \"pimcore/settings/user/editorSettings.js\",
    \"pimcore/settings/user/websiteTranslationSettings.js\",
    \"pimcore/settings/user/role/panel.js\",
    \"pimcore/settings/user/role/tab.js\",
    \"pimcore/settings/user/user/objectrelations.js\",
    \"pimcore/settings/user/user/settings.js\",
    \"pimcore/settings/user/user/keyBindings.js\",
    \"pimcore/settings/user/workspaces.js\",
    \"pimcore/settings/user/workspace/asset.js\",
    \"pimcore/settings/user/workspace/document.js\",
    \"pimcore/settings/user/workspace/object.js\",
    \"pimcore/settings/user/workspace/customlayouts.js\",
    \"pimcore/settings/user/workspace/language.js\",
    \"pimcore/settings/user/workspace/special.js\",
    \"pimcore/settings/user/role/settings.js\",
    \"pimcore/settings/profile/panel.js\",
    \"pimcore/settings/profile/twoFactorSettings.js\",
    \"pimcore/settings/thumbnail/item.js\",
    \"pimcore/settings/thumbnail/panel.js\",
    \"pimcore/settings/videothumbnail/item.js\",
    \"pimcore/settings/videothumbnail/panel.js\",
    \"pimcore/settings/translation.js\",
    \"pimcore/settings/translationEditor.js\",
    \"pimcore/settings/translation/translationmerger.js\",
    \"pimcore/settings/translation/translationSettingsTab.js\",
    \"pimcore/settings/metadata/predefined.js\",
    \"pimcore/settings/properties/predefined.js\",
    \"pimcore/settings/docTypes.js\",
    \"pimcore/settings/system.js\",
    \"pimcore/settings/systemAppearance.js\",
    \"pimcore/settings/website.js\",

    \"pimcore/settings/recyclebin.js\",
    \"pimcore/settings/maintenance.js\",
    \"pimcore/settings/email/log.js\",
    \"pimcore/settings/email/blocklist.js\",

    \"pimcore/settings/gdpr/gdprPanel.js\",
    \"pimcore/settings/gdpr/dataproviders/assets.js\",
    \"pimcore/settings/gdpr/dataproviders/dataObjects.js\",
    \"pimcore/settings/gdpr/dataproviders/sentMail.js\",
    \"pimcore/settings/gdpr/dataproviders/pimcoreUsers.js\",

    \"pimcore/element/applicationLoggerPanelFacade.js\",
    \"pimcore/element/customReportsPanelFacade.js\",
    \"pimcore/element/selector/searchFacade.js\",

    \"pimcore/element/abstract.js\",
    \"pimcore/element/abstractPreview.js\",
    \"pimcore/element/properties.js\",
    \"pimcore/element/scheduler.js\",
    \"pimcore/element/dependencies.js\",
    \"pimcore/element/metainfo.js\",
    \"pimcore/element/history.js\",
    \"pimcore/element/notes.js\",
    \"pimcore/element/note_details.js\",
    \"pimcore/element/workflows.js\",
    \"pimcore/element/tag/imagecropper.js\",
    \"pimcore/element/tag/imagehotspotmarkereditor.js\",
    \"pimcore/element/replace_assignments.js\",
    \"pimcore/element/permissionchecker.js\",
    \"pimcore/element/gridexport/abstract.js\",
    \"pimcore/element/helpers/gridColumnConfig.js\",
    \"pimcore/element/helpers/gridConfigDialog.js\",
    \"pimcore/element/helpers/gridCellEditor.js\",
    \"pimcore/element/helpers/gridTabAbstract.js\",
    \"pimcore/object/helpers/grid.js\",
    \"pimcore/object/helpers/gridConfigDialog.js\",
    \"pimcore/object/helpers/classTree.js\",
    \"pimcore/object/helpers/gridTabAbstract.js\",
    \"pimcore/object/helpers/metadataMultiselectEditor.js\",
    \"pimcore/object/helpers/customLayoutEditor.js\",
    \"pimcore/object/helpers/optionEditor.js\",
    \"pimcore/object/helpers/imageGalleryDropZone.js\",
    \"pimcore/object/helpers/imageGalleryPanel.js\",
    \"pimcore/object/helpers/selectField.js\",
    \"pimcore/object/helpers/reservedWords.js\",
    \"pimcore/element/tag/configuration.js\",
    \"pimcore/element/tag/assignment.js\",
    \"pimcore/element/tag/tree.js\",
    \"pimcore/asset/helpers/metadataTree.js\",
    \"pimcore/asset/helpers/gridConfigDialog.js\",
    \"pimcore/asset/helpers/gridTabAbstract.js\",
    \"pimcore/asset/helpers/grid.js\",


    \"pimcore/document/properties.js\",
    \"pimcore/document/document.js\",
    \"pimcore/document/page_snippet.js\",
    \"pimcore/document/edit.js\",
    \"pimcore/document/versions.js\",
    \"pimcore/document/settings_abstract.js\",
    \"pimcore/document/pages/settings.js\",
    \"pimcore/document/pages/preview.js\",
    \"pimcore/document/snippets/settings.js\",
    \"pimcore/document/emails/settings.js\",
    \"pimcore/document/link.js\",
    \"pimcore/document/hardlink.js\",
    \"pimcore/document/folder.js\",
    \"pimcore/document/tree.js\",
    \"pimcore/document/snippet.js\",
    \"pimcore/document/email.js\",
    \"pimcore/document/page.js\",
    \"pimcore/document/document_language_overview.js\",
    \"pimcore/document/customviews/tree.js\",

    \"pimcore/asset/metadata/data/data.js\",
    \"pimcore/asset/metadata/data/input.js\",
    \"pimcore/asset/metadata/data/textarea.js\",
    \"pimcore/asset/metadata/data/asset.js\",
    \"pimcore/asset/metadata/data/document.js\",
    \"pimcore/asset/metadata/data/object.js\",
    \"pimcore/asset/metadata/data/date.js\",
    \"pimcore/asset/metadata/data/checkbox.js\",
    \"pimcore/asset/metadata/data/select.js\",

    \"pimcore/asset/metadata/tags/abstract.js\",
    \"pimcore/asset/metadata/tags/checkbox.js\",
    \"pimcore/asset/metadata/tags/date.js\",
    \"pimcore/asset/metadata/tags/input.js\",
    \"pimcore/asset/metadata/tags/manyToOneRelation.js\",
    \"pimcore/asset/metadata/tags/asset.js\",
    \"pimcore/asset/metadata/tags/document.js\",
    \"pimcore/asset/metadata/tags/object.js\",
    \"pimcore/asset/metadata/tags/select.js\",
    \"pimcore/asset/metadata/tags/textarea.js\",
    \"pimcore/asset/asset.js\",
    \"pimcore/asset/unknown.js\",
    \"pimcore/asset/embedded_meta_data.js\",
    \"pimcore/asset/image.js\",
    \"pimcore/asset/document.js\",
    \"pimcore/asset/archive.js\",
    \"pimcore/asset/video.js\",
    \"pimcore/asset/audio.js\",
    \"pimcore/asset/text.js\",
    \"pimcore/asset/folder.js\",
    \"pimcore/asset/listfolder.js\",
    \"pimcore/asset/versions.js\",
    \"pimcore/asset/metadata/dataProvider.js\",
    \"pimcore/asset/metadata/grid.js\",
    \"pimcore/asset/metadata/editor.js\",
    \"pimcore/asset/tree.js\",
    \"pimcore/asset/customviews/tree.js\",
    \"pimcore/asset/gridexport/csv.js\",
    \"pimcore/asset/gridexport/xlsx.js\",

    \"pimcore/object/helpers/edit.js\",
    \"pimcore/object/helpers/layout.js\",
    \"pimcore/object/classes/class.js\",
    \"pimcore/object/class.js\",
    \"pimcore/object/bulk-base.js\",
    \"pimcore/object/bulk-export.js\",
    \"pimcore/object/bulk-import.js\",
    \"pimcore/object/classes/data/data.js\",
    \"pimcore/object/classes/data/block.js\",
    \"pimcore/object/classes/data/classificationstore.js\",
    \"pimcore/object/classes/data/rgbaColor.js\",
    \"pimcore/object/classes/data/date.js\",
    \"pimcore/object/classes/data/datetime.js\",
    \"pimcore/object/classes/data/dateRange.js\",
    \"pimcore/object/classes/data/encryptedField.js\",
    \"pimcore/object/classes/data/time.js\",
    \"pimcore/object/classes/data/manyToOneRelation.js\",
    \"pimcore/object/classes/data/image.js\",
    \"pimcore/object/classes/data/externalImage.js\",
    \"pimcore/object/classes/data/hotspotimage.js\",
    \"pimcore/object/classes/data/imagegallery.js\",
    \"pimcore/object/classes/data/video.js\",
    \"pimcore/object/classes/data/input.js\",
    \"pimcore/object/classes/data/numeric.js\",
    \"pimcore/object/classes/data/numericRange.js\",
    \"pimcore/object/classes/data/manyToManyObjectRelation.js\",
    \"pimcore/object/classes/data/advancedManyToManyRelation.js\",
    \"pimcore/object/classes/data/advancedManyToManyObjectRelation.js\",
    \"pimcore/object/classes/data/reverseObjectRelation.js\",
    \"pimcore/object/classes/data/booleanSelect.js\",
    \"pimcore/object/classes/data/select.js\",
    \"pimcore/object/classes/data/urlSlug.js\",
    \"pimcore/object/classes/data/user.js\",
    \"pimcore/object/classes/data/textarea.js\",
    \"pimcore/object/classes/data/wysiwyg.js\",
    \"pimcore/object/classes/data/checkbox.js\",
    \"pimcore/object/classes/data/consent.js\",
    \"pimcore/object/classes/data/slider.js\",
    \"pimcore/object/classes/data/manyToManyRelation.js\",
    \"pimcore/object/classes/data/table.js\",
    \"pimcore/object/classes/data/structuredTable.js\",
    \"pimcore/object/classes/data/country.js\",
    \"pimcore/object/classes/data/geo/abstract.js\",
    \"pimcore/object/classes/data/geopoint.js\",
    \"pimcore/object/classes/data/geobounds.js\",
    \"pimcore/object/classes/data/geopolygon.js\",
    \"pimcore/object/classes/data/geopolyline.js\",
    \"pimcore/object/classes/data/language.js\",
    \"pimcore/object/classes/data/password.js\",
    \"pimcore/object/classes/data/multiselect.js\",
    \"pimcore/object/classes/data/link.js\",
    \"pimcore/object/classes/data/fieldcollections.js\",
    \"pimcore/object/classes/data/objectbricks.js\",
    \"pimcore/object/classes/data/localizedfields.js\",
    \"pimcore/object/classes/data/countrymultiselect.js\",
    \"pimcore/object/classes/data/languagemultiselect.js\",
    \"pimcore/object/classes/data/firstname.js\",
    \"pimcore/object/classes/data/lastname.js\",
    \"pimcore/object/classes/data/email.js\",
    \"pimcore/object/classes/data/gender.js\",
    \"pimcore/object/classes/data/quantityValue.js\",
    \"pimcore/object/classes/data/inputQuantityValue.js\",
    \"pimcore/object/classes/data/quantityValueRange.js\",
    \"pimcore/object/classes/data/calculatedValue.js\",
    \"pimcore/object/classes/layout/layout.js\",
    \"pimcore/object/classes/layout/accordion.js\",
    \"pimcore/object/classes/layout/fieldset.js\",
    \"pimcore/object/classes/layout/fieldcontainer.js\",
    \"pimcore/object/classes/layout/panel.js\",
    \"pimcore/object/classes/layout/region.js\",
    \"pimcore/object/classes/layout/tabpanel.js\",
    \"pimcore/object/classes/layout/iframe.js\",
    \"pimcore/object/fieldlookup/filterdialog.js\",
    \"pimcore/object/fieldlookup/helper.js\",
    \"pimcore/object/classes/layout/text.js\",
    \"pimcore/object/fieldcollection.js\",
    \"pimcore/object/fieldcollections/field.js\",
    \"pimcore/object/gridcolumn/Abstract.js\",
    \"pimcore/object/gridcolumn/operator/IsEqual.js\",
    \"pimcore/object/gridcolumn/operator/Text.js\",
    \"pimcore/object/gridcolumn/operator/Anonymizer.js\",
    \"pimcore/object/gridcolumn/operator/AnyGetter.js\",
    \"pimcore/object/gridcolumn/operator/AssetMetadataGetter.js\",
    \"pimcore/object/gridcolumn/operator/Arithmetic.js\",
    \"pimcore/object/gridcolumn/operator/Boolean.js\",
    \"pimcore/object/gridcolumn/operator/BooleanFormatter.js\",
    \"pimcore/object/gridcolumn/operator/CaseConverter.js\",
    \"pimcore/object/gridcolumn/operator/CharCounter.js\",
    \"pimcore/object/gridcolumn/operator/Concatenator.js\",
    \"pimcore/object/gridcolumn/operator/DateFormatter.js\",
    \"pimcore/object/gridcolumn/operator/ElementCounter.js\",
    \"pimcore/object/gridcolumn/operator/Iterator.js\",
    \"pimcore/object/gridcolumn/operator/JSON.js\",
    \"pimcore/object/gridcolumn/operator/LocaleSwitcher.js\",
    \"pimcore/object/gridcolumn/operator/Merge.js\",
    \"pimcore/object/gridcolumn/operator/ObjectFieldGetter.js\",
    \"pimcore/object/gridcolumn/operator/PHP.js\",
    \"pimcore/object/gridcolumn/operator/PHPCode.js\",
    \"pimcore/object/gridcolumn/operator/Base64.js\",
    \"pimcore/object/gridcolumn/operator/TranslateValue.js\",
    \"pimcore/object/gridcolumn/operator/PropertyGetter.js\",
    \"pimcore/object/gridcolumn/operator/RequiredBy.js\",
    \"pimcore/object/gridcolumn/operator/StringContains.js\",
    \"pimcore/object/gridcolumn/operator/StringReplace.js\",
    \"pimcore/object/gridcolumn/operator/Substring.js\",
    \"pimcore/object/gridcolumn/operator/LFExpander.js\",
    \"pimcore/object/gridcolumn/operator/Trimmer.js\",
    \"pimcore/object/gridcolumn/operator/Alias.js\",
    \"pimcore/object/gridcolumn/operator/WorkflowState.js\",
    \"pimcore/object/gridcolumn/value/DefaultValue.js\",
    \"pimcore/object/gridcolumn/operator/GeopointRenderer.js\",
    \"pimcore/object/gridcolumn/operator/ImageRenderer.js\",
    \"pimcore/object/gridcolumn/operator/HotspotimageRenderer.js\",
    \"pimcore/object/importcolumn/Abstract.js\",
    \"pimcore/object/importcolumn/operator/Base64.js\",
    \"pimcore/object/importcolumn/operator/Ignore.js\",
    \"pimcore/object/importcolumn/operator/Iterator.js\",
    \"pimcore/object/importcolumn/operator/LocaleSwitcher.js\",
    \"pimcore/object/importcolumn/operator/ObjectBrickSetter.js\",
    \"pimcore/object/importcolumn/operator/PHPCode.js\",
    \"pimcore/object/importcolumn/operator/Published.js\",
    \"pimcore/object/importcolumn/operator/Splitter.js\",
    \"pimcore/object/importcolumn/operator/Unserialize.js\",
    \"pimcore/object/importcolumn/value/DefaultValue.js\",
    \"pimcore/object/objectbrick.js\",
    \"pimcore/object/objectbricks/field.js\",
    \"pimcore/object/selectoptions.js\",
    \"pimcore/object/selectoptionsitems/definition.js\",
    \"pimcore/object/tags/abstract.js\",
    \"pimcore/object/tags/abstractRelations.js\",
    \"pimcore/object/tags/block.js\",
    \"pimcore/object/tags/rgbaColor.js\",
    \"pimcore/object/tags/date.js\",
    \"pimcore/object/tags/datetime.js\",
    \"pimcore/object/tags/dateRange.js\",
    \"pimcore/object/tags/time.js\",
    \"pimcore/object/tags/manyToOneRelation.js\",
    \"pimcore/object/tags/image.js\",
    \"pimcore/object/tags/encryptedField.js\",
    \"pimcore/object/tags/externalImage.js\",
    \"pimcore/object/tags/hotspotimage.js\",
    \"pimcore/object/tags/imagegallery.js\",
    \"pimcore/object/tags/video.js\",
    \"pimcore/object/tags/input.js\",
    \"pimcore/object/tags/classificationstore.js\",
    \"pimcore/object/tags/numeric.js\",
    \"pimcore/object/tags/numericRange.js\",
    \"pimcore/object/tags/manyToManyObjectRelation.js\",
    \"pimcore/object/tags/advancedManyToManyRelation.js\",
    \"pimcore/object/gridcolumn/operator/FieldCollectionGetter.js\",
    \"pimcore/object/tags/advancedManyToManyObjectRelation.js\",
    \"pimcore/object/tags/reverseObjectRelation.js\",
    \"pimcore/object/tags/urlSlug.js\",
    \"pimcore/object/tags/booleanSelect.js\",
    \"pimcore/object/tags/select.js\",
    \"pimcore/object/tags/user.js\",
    \"pimcore/object/tags/checkbox.js\",
    \"pimcore/object/tags/consent.js\",
    \"pimcore/object/tags/textarea.js\",
    \"pimcore/object/tags/wysiwyg.js\",
    \"pimcore/object/tags/slider.js\",
    \"pimcore/object/tags/manyToManyRelation.js\",
    \"pimcore/object/tags/table.js\",
    \"pimcore/object/tags/structuredTable.js\",
    \"pimcore/object/tags/country.js\",
    \"pimcore/object/tags/geo/abstract.js\",
    \"pimcore/object/tags/geobounds.js\",
    \"pimcore/object/tags/geopoint.js\",
    \"pimcore/object/tags/geopolygon.js\",
    \"pimcore/object/tags/geopolyline.js\",
    \"pimcore/object/tags/language.js\",
    \"pimcore/object/tags/password.js\",
    \"pimcore/object/tags/multiselect.js\",
    \"pimcore/object/tags/link.js\",
    \"pimcore/object/tags/fieldcollections.js\",
    \"pimcore/object/tags/localizedfields.js\",
    \"pimcore/object/tags/countrymultiselect.js\",
    \"pimcore/object/tags/languagemultiselect.js\",
    \"pimcore/object/tags/objectbricks.js\",
    \"pimcore/object/tags/firstname.js\",
    \"pimcore/object/tags/lastname.js\",
    \"pimcore/object/tags/email.js\",
    \"pimcore/object/tags/gender.js\",
    \"pimcore/object/tags/quantityValue.js\",
    \"pimcore/object/tags/quantityValueRange.js\",
    \"pimcore/object/tags/inputQuantityValue.js\",
    \"pimcore/object/tags/calculatedValue.js\",
    \"pimcore/object/preview.js\",
    \"pimcore/object/versions.js\",
    \"pimcore/object/variantsTab.js\",
    \"pimcore/object/folder/search.js\",
    \"pimcore/object/edit.js\",
    \"pimcore/object/abstract.js\",
    \"pimcore/object/object.js\",
    \"pimcore/object/folder.js\",
    \"pimcore/object/variant.js\",
    \"pimcore/object/tree.js\",
    \"pimcore/object/layout/iframe.js\",
    \"pimcore/object/customviews/tree.js\",
    \"pimcore/object/quantityvalue/unitsettings.js\",
    \"pimcore/object/gridexport/csv.js\",
    \"pimcore/object/gridexport/xlsx.js\",

    \"pimcore/layout/portal.js\",
    \"pimcore/layout/portlets/abstract.js\",
    \"pimcore/layout/portlets/modifiedDocuments.js\",
    \"pimcore/layout/portlets/modifiedObjects.js\",
    \"pimcore/layout/portlets/modifiedAssets.js\",
    \"pimcore/layout/portlets/modificationStatistic.js\",

    \"pimcore/layout/menu.js\",
    \"pimcore/layout/toolbar.js\",
    \"pimcore/layout/treepanelmanager.js\",
    \"pimcore/document/seemode.js\",

    \"pimcore/object/classificationstore/groupsPanel.js\",
    \"pimcore/object/classificationstore/propertiesPanel.js\",
    \"pimcore/object/classificationstore/collectionsPanel.js\",
    \"pimcore/object/classificationstore/keyDefinitionWindow.js\",
    \"pimcore/object/classificationstore/keySelectionWindow.js\",
    \"pimcore/object/classificationstore/relationSelectionWindow.js\",
    \"pimcore/object/classificationstore/storeConfiguration.js\",
    \"pimcore/object/classificationstore/storeTree.js\",
    \"pimcore/object/classificationstore/columnConfigDialog.js\",


    \"pimcore/workflow/transitionPanel.js\",
    \"pimcore/workflow/transitions.js\",
    \"pimcore/workflow/transitions.js\",


    \"pimcore/colorpicker-overrides.js\",


    \"pimcore/notification/helper.js\",
    \"pimcore/notification/panel.js\",
    \"pimcore/notification/modal.js\",
]
%}

<!-- some javascript -->
{# pimcore constants #}
<script {{ pimcore_csp.getNonceHtmlAttribute()|raw }}>
    pimcore.settings = {{(settings|json_encode(constant('JSON_PRETTY_PRINT'))|raw)}};
</script>

<script src=\"{{ path('pimcore_admin_misc_jsontranslationssystem', {'language': language, '_dc': settings.build }) }}\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>
<script src=\"{{ path('pimcore_admin_user_getcurrentuser', {'_dc': settings.build }) }}\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>
<script src=\"{{ path('pimcore_admin_misc_availablelanguages', {'_dc': settings.build }) }}\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>

<!-- library scripts -->
{% for scriptUrl in scriptLibs %}
    <script src=\"/bundles/pimcoreadmin/js/{{ scriptUrl }}?_dc={{ settings.build }}\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>
{% endfor %}

<!-- internal scripts -->
{% if settings.disableMinifyJs %}
    {% for scriptUrl in scripts %}
        <script src=\"/bundles/pimcoreadmin/js/{{ scriptUrl }}?_dc={{ settings.build }}\"></script>
    {% endfor %}
{% else %}
    {{ pimcore_minimize_scripts(scripts)|raw }}
{% endif %}

{# load plugin scripts #}

{# // only add the timestamp if the devmode is not activated, otherwise it is very hard to develop and debug plugins,
 # // because the filename changes on every reload and therefore breakpoints, ... are resetted on every reload
#}

{% set pluginDcValue = \"now\"|date('U') %}
{% if settings.disableMinifyJs %}
    {% set pluginDcValue = 1 %}
{% endif %}

<!-- bundle scripts -->
{% if settings.disableMinifyJs %}
    {% for pluginJsPath in pluginJsPaths %}
        <script src=\"{{ pluginJsPath }}?_dc={{ pluginDcValue }}\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>
    {% endfor %}
{% else %}
    {{ pimcore_minimize_scripts(pluginJsPaths)|raw }}
{% endif %}

{% for pluginCssPath in pluginCssPaths %}
    <link rel=\"stylesheet\" type=\"text/css\" href=\"{{ pluginCssPath }}?_dc={{ pluginDcValue }}\"/>
{% endfor %}

{#  MUST BE THE LAST LINE  #}
<script src=\"/bundles/pimcoreadmin/js/pimcore/startup.js?_dc={{ settings.build }}\" {{ pimcore_csp.getNonceHtmlAttribute()|raw }}></script>
</body>
</html>
", "@PimcoreAdmin/admin/index/index.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/index/index.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 1, "if" => 80, "block" => 126, "for" => 635];
        static $filters = ["default" => 80, "escape" => 81, "raw" => 91, "merge" => 206, "json_encode" => 627, "date" => 654, "trans" => 127];
        static $functions = ["path" => 79, "asset" => 101, "encore_entry_script_tags" => 104, "encore_entry_link_tags" => 105, "pimcore_file_exists" => 205, "constant" => 205, "pimcore_minimize_scripts" => 645];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'block', 'for'],
                ['default', 'escape', 'raw', 'merge', 'json_encode', 'date', 'trans'],
                ['path', 'asset', 'encore_entry_script_tags', 'encore_entry_link_tags', 'pimcore_file_exists', 'constant', 'pimcore_minimize_scripts'],
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
