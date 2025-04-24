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

/* @PimcoreAdmin/admin/asset/image_editor.html.twig */
class __TwigTemplate_6f7444204194b1537c8440a2cfc19a60 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/image_editor.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/asset/image_editor.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html dir=\"ltr\" lang=\"en-US\">
<head>
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <style>
        .cursor-pointer {
            cursor: pointer;
        }
    </style>
    <base href=\"/bundles/pimcoreadmin/js/lib/minipaint/\" />
    ";
        // line 12
        yield $this->extensions['Symfony\WebpackEncoreBundle\Twig\EntryFilesTwigExtension']->renderWebpackScriptTags("imageEditor", null, "pimcoreAdminImageEditor");
        yield "
</head>
<body>
<div class=\"wrapper\">
    <nav aria-label=\"Main Menu\" class=\"main_menu\" id=\"main_menu\"></nav>

    <div class=\"submenu\">
        <div class=\"block attributes\" id=\"action_attributes\"></div>
        <div class=\"clear\"></div>
        <button class=\"undo_button\" id=\"undo_button\" type=\"button\">
            <span class=\"sr_only\">Undo</span>
        </button>
    </div>

    <div class=\"sidebar_left\" id=\"tools_container\"></div>

    <div class=\"middle_area\" id=\"middle_area\">

        <canvas class=\"ruler_left\" id=\"ruler_left\"></canvas>
        <canvas class=\"ruler_top\" id=\"ruler_top\"></canvas>

        <div class=\"main_wrapper\" id=\"main_wrapper\">
            <div class=\"canvas_wrapper\" id=\"canvas_wrapper\">
                <div id=\"mouse\"></div>
                <div class=\"transparent-grid\" id=\"canvas_minipaint_background\"></div>
                <canvas id=\"canvas_minipaint\">
                    <div class=\"trn error\">
                        Your browser does not support canvas or JavaScript is not enabled.
                    </div>
                </canvas>
            </div>
        </div>
    </div>

    <div class=\"sidebar_right\">
        <div class=\"preview block\">
            <h2 class=\"trn toggle\" data-target=\"toggle_preview\">Preview</h2>
            <div id=\"toggle_preview\"></div>
        </div>

        <div class=\"colors block\">
            <h2 class=\"trn toggle\" data-target=\"toggle_colors\">Colors</h2>
            <input
                title=\"Click to change color\"
                type=\"color\"
                class=\"color_area\"
                id=\"main_color\"
                value=\"#0000ff\"\t/>
            <div class=\"content\" id=\"toggle_colors\"></div>
        </div>

        <div class=\"block\" id=\"info_base\">
            <h2 class=\"trn toggle toggle-full\" data-target=\"toggle_info\">Information</h2>
            <div class=\"content\" id=\"toggle_info\"></div>
        </div>

        <div class=\"details block\" id=\"details_base\">
            <h2 class=\"trn toggle toggle-full\" data-target=\"toggle_details\">Layer details</h2>
            <div class=\"content\" id=\"toggle_details\"></div>
        </div>

        <div class=\"layers block\">
            <h2 class=\"trn\">Layers</h2>
            <div class=\"content\" id=\"layers_base\"></div>
        </div>
    </div>
</div>
<div class=\"mobile_menu\">
    <button class=\"left_mobile_menu\" id=\"left_mobile_menu_button\" type=\"button\">
        <span class=\"sr_only\">Toggle Menu</span>
    </button>
    <button class=\"right_mobile_menu\" id=\"mobile_menu_button\" type=\"button\">
        <span class=\"sr_only\">Toggle Menu</span>
    </button>
</div>
<div class=\"hidden\" id=\"tmp\"></div>
<div id=\"popups\"></div>

";
        // line 90
        $context["imageFileExtension"] = $this->extensions['Pimcore\Twig\Extension\HelpersExtension']->getFileExtension($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 90, $this->source); })()), "getFilename", [], "method", false, false, true, 90), 90, $this->source));
        // line 91
        $context["imageUrl"] = $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_asset_getasset", ["id" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 91, $this->source); })()), "getId", [], "method", false, false, true, 91), 91, $this->source)]);
        // line 92
        yield "
";
        // line 93
        if (!CoreExtension::inFilter((isset($context["imageFileExtension"]) || array_key_exists("imageFileExtension", $context) ? $context["imageFileExtension"] : (function () { throw new RuntimeError('Variable "imageFileExtension" does not exist.', 93, $this->source); })()), ["png", "jpg", "jpeg"])) {
            // line 94
            yield "    ";
            $context["imageUrl"] = $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_asset_getimagethumbnail", ["id" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 94, $this->source); })()), "getId", [], "method", false, false, true, 94), 94, $this->source), "format" => "png"]);
        }
        // line 96
        yield "
<img style=\"visibility: hidden\" id='image' src=\"";
        // line 97
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["imageUrl"]) || array_key_exists("imageUrl", $context) ? $context["imageUrl"] : (function () { throw new RuntimeError('Variable "imageUrl" does not exist.', 97, $this->source); })()), 97, $this->source), "html", null, true);
        yield "\" />
<script ";
        // line 98
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 98, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 98), 98, $this->source);
        yield ">

    /**
    * wait for image editor to be fully available 
    * before loading image to editor
    */
    async function loadEditor(e) {
        return new Promise(resolve => {
            var checkInterval = setInterval(() => {
                if (window.Layers) {
                    clearInterval(checkInterval);
                    manipulateMenuBar();
                    loadImageToEditor(e);
                    resolve(true);
                }
            }, 300);
        });
    }

    function loadImageToEditor(e) {
        var image = document.getElementById('image');
        window.Layers.insert({
            name: \"";
        // line 120
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 120, $this->source); })()), "getFilename", [], "method", false, false, true, 120), 120, $this->source), "html", null, true);
        yield "\",
            type: 'image',
            data: image,
            width: image.naturalWidth || image.width,
            height: image.naturalHeight || image.height,
            width_original: image.naturalWidth || image.width,
            height_original: image.naturalHeight || image.height,
        });

        document.getElementById('save_button').addEventListener('click', function () {

            var tempCanvas = document.createElement(\"canvas\");
            var tempCtx = tempCanvas.getContext(\"2d\");
            var dim = window.Layers.get_dimensions();
            tempCanvas.width = dim.width;
            tempCanvas.height = dim.height;
            Layers.convert_layers_to_canvas(tempCtx);
            var dataUri = tempCanvas.toDataURL('image/";
        // line 137
        yield ((((isset($context["imageFileExtension"]) || array_key_exists("imageFileExtension", $context) ? $context["imageFileExtension"] : (function () { throw new RuntimeError('Variable "imageFileExtension" does not exist.', 137, $this->source); })()) == "png")) ? ("png") : ("jpeg"));
        yield "');

            parent.Ext.Ajax.request({
                url: \"";
        // line 140
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("pimcore_admin_asset_imageeditorsave", ["id" => $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["asset"]) || array_key_exists("asset", $context) ? $context["asset"] : (function () { throw new RuntimeError('Variable "asset" does not exist.', 140, $this->source); })()), "getId", [], "method", false, false, true, 140), 140, $this->source)]), "html", null, true);
        yield "\",
                method: 'PUT',
                params: {
                    dataUri: dataUri
                }
            });

            return false;
        });
    }

    function manipulateMenuBar() {
        const menuBar = document.getElementsByClassName('menu_bar')[0];
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');
        const spanElement = document.createElement('span');

        aElement.setAttribute('id', 'save_button');
        aElement.setAttribute('role', 'menu_item');
        aElement.setAttribute('tabindex', '-1');
        aElement.setAttribute('aria-haspopup', 'false');
        aElement.classList.add('cursor-pointer');
        aElement.setAttribute('aria-expanded', 'false');
        spanElement.setAttribute('class', 'name trn');
        spanElement.innerText = parent.t('save');

        aElement.appendChild(spanElement);
        liElement.appendChild(aElement);
        menuBar.prepend(liElement);

        document.getElementById('main_menu_0_0').addEventListener('click', () => {
            document.getElementById('main_menu_1_10').remove();
            document.getElementById('main_menu_1_11').remove();
        })

        removeHref();

        document.getElementsByTagName('nav')[0].addEventListener('click', (e) => {
            removeHref();
        });
    }

    function removeHref() {
        const allLinkElements = document.getElementsByTagName('nav')[0].querySelectorAll(\"a\");
        for (let a of allLinkElements) {
            if (a.getAttribute('href') === 'javascript:void(0)') {
                a.classList.add('cursor-pointer');
                a.removeAttribute('href');
            }
        }
    }
    
    window.addEventListener(\"load\", function(e) {
        loadEditor(e);
    }, false);


</script>

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
        return "@PimcoreAdmin/admin/asset/image_editor.html.twig";
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
        return array (  215 => 140,  209 => 137,  189 => 120,  164 => 98,  160 => 97,  157 => 96,  153 => 94,  151 => 93,  148 => 92,  146 => 91,  144 => 90,  63 => 12,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html dir=\"ltr\" lang=\"en-US\">
<head>
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <style>
        .cursor-pointer {
            cursor: pointer;
        }
    </style>
    <base href=\"/bundles/pimcoreadmin/js/lib/minipaint/\" />
    {{ encore_entry_script_tags('imageEditor', null, 'pimcoreAdminImageEditor') }}
</head>
<body>
<div class=\"wrapper\">
    <nav aria-label=\"Main Menu\" class=\"main_menu\" id=\"main_menu\"></nav>

    <div class=\"submenu\">
        <div class=\"block attributes\" id=\"action_attributes\"></div>
        <div class=\"clear\"></div>
        <button class=\"undo_button\" id=\"undo_button\" type=\"button\">
            <span class=\"sr_only\">Undo</span>
        </button>
    </div>

    <div class=\"sidebar_left\" id=\"tools_container\"></div>

    <div class=\"middle_area\" id=\"middle_area\">

        <canvas class=\"ruler_left\" id=\"ruler_left\"></canvas>
        <canvas class=\"ruler_top\" id=\"ruler_top\"></canvas>

        <div class=\"main_wrapper\" id=\"main_wrapper\">
            <div class=\"canvas_wrapper\" id=\"canvas_wrapper\">
                <div id=\"mouse\"></div>
                <div class=\"transparent-grid\" id=\"canvas_minipaint_background\"></div>
                <canvas id=\"canvas_minipaint\">
                    <div class=\"trn error\">
                        Your browser does not support canvas or JavaScript is not enabled.
                    </div>
                </canvas>
            </div>
        </div>
    </div>

    <div class=\"sidebar_right\">
        <div class=\"preview block\">
            <h2 class=\"trn toggle\" data-target=\"toggle_preview\">Preview</h2>
            <div id=\"toggle_preview\"></div>
        </div>

        <div class=\"colors block\">
            <h2 class=\"trn toggle\" data-target=\"toggle_colors\">Colors</h2>
            <input
                title=\"Click to change color\"
                type=\"color\"
                class=\"color_area\"
                id=\"main_color\"
                value=\"#0000ff\"\t/>
            <div class=\"content\" id=\"toggle_colors\"></div>
        </div>

        <div class=\"block\" id=\"info_base\">
            <h2 class=\"trn toggle toggle-full\" data-target=\"toggle_info\">Information</h2>
            <div class=\"content\" id=\"toggle_info\"></div>
        </div>

        <div class=\"details block\" id=\"details_base\">
            <h2 class=\"trn toggle toggle-full\" data-target=\"toggle_details\">Layer details</h2>
            <div class=\"content\" id=\"toggle_details\"></div>
        </div>

        <div class=\"layers block\">
            <h2 class=\"trn\">Layers</h2>
            <div class=\"content\" id=\"layers_base\"></div>
        </div>
    </div>
</div>
<div class=\"mobile_menu\">
    <button class=\"left_mobile_menu\" id=\"left_mobile_menu_button\" type=\"button\">
        <span class=\"sr_only\">Toggle Menu</span>
    </button>
    <button class=\"right_mobile_menu\" id=\"mobile_menu_button\" type=\"button\">
        <span class=\"sr_only\">Toggle Menu</span>
    </button>
</div>
<div class=\"hidden\" id=\"tmp\"></div>
<div id=\"popups\"></div>

{% set imageFileExtension = pimcore_file_extension(asset.getFilename()) %}
{% set imageUrl = path('pimcore_admin_asset_getasset', {id: asset.getId()}) %}

{% if imageFileExtension not in ['png', 'jpg', 'jpeg'] %}
    {% set imageUrl = path('pimcore_admin_asset_getimagethumbnail', {id: asset.getId(), format: 'png' }) %}
{% endif %}

<img style=\"visibility: hidden\" id='image' src=\"{{ imageUrl }}\" />
<script {{ pimcore_csp.getNonceHtmlAttribute()|raw }}>

    /**
    * wait for image editor to be fully available 
    * before loading image to editor
    */
    async function loadEditor(e) {
        return new Promise(resolve => {
            var checkInterval = setInterval(() => {
                if (window.Layers) {
                    clearInterval(checkInterval);
                    manipulateMenuBar();
                    loadImageToEditor(e);
                    resolve(true);
                }
            }, 300);
        });
    }

    function loadImageToEditor(e) {
        var image = document.getElementById('image');
        window.Layers.insert({
            name: \"{{ asset.getFilename() }}\",
            type: 'image',
            data: image,
            width: image.naturalWidth || image.width,
            height: image.naturalHeight || image.height,
            width_original: image.naturalWidth || image.width,
            height_original: image.naturalHeight || image.height,
        });

        document.getElementById('save_button').addEventListener('click', function () {

            var tempCanvas = document.createElement(\"canvas\");
            var tempCtx = tempCanvas.getContext(\"2d\");
            var dim = window.Layers.get_dimensions();
            tempCanvas.width = dim.width;
            tempCanvas.height = dim.height;
            Layers.convert_layers_to_canvas(tempCtx);
            var dataUri = tempCanvas.toDataURL('image/{{ imageFileExtension == \"png\" ? \"png\" : \"jpeg\" }}');

            parent.Ext.Ajax.request({
                url: \"{{ path('pimcore_admin_asset_imageeditorsave', {id: asset.getId()}) }}\",
                method: 'PUT',
                params: {
                    dataUri: dataUri
                }
            });

            return false;
        });
    }

    function manipulateMenuBar() {
        const menuBar = document.getElementsByClassName('menu_bar')[0];
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');
        const spanElement = document.createElement('span');

        aElement.setAttribute('id', 'save_button');
        aElement.setAttribute('role', 'menu_item');
        aElement.setAttribute('tabindex', '-1');
        aElement.setAttribute('aria-haspopup', 'false');
        aElement.classList.add('cursor-pointer');
        aElement.setAttribute('aria-expanded', 'false');
        spanElement.setAttribute('class', 'name trn');
        spanElement.innerText = parent.t('save');

        aElement.appendChild(spanElement);
        liElement.appendChild(aElement);
        menuBar.prepend(liElement);

        document.getElementById('main_menu_0_0').addEventListener('click', () => {
            document.getElementById('main_menu_1_10').remove();
            document.getElementById('main_menu_1_11').remove();
        })

        removeHref();

        document.getElementsByTagName('nav')[0].addEventListener('click', (e) => {
            removeHref();
        });
    }

    function removeHref() {
        const allLinkElements = document.getElementsByTagName('nav')[0].querySelectorAll(\"a\");
        for (let a of allLinkElements) {
            if (a.getAttribute('href') === 'javascript:void(0)') {
                a.classList.add('cursor-pointer');
                a.removeAttribute('href');
            }
        }
    }
    
    window.addEventListener(\"load\", function(e) {
        loadEditor(e);
    }, false);


</script>

</body>
</html>
", "@PimcoreAdmin/admin/asset/image_editor.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/asset/image_editor.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 90, "if" => 93];
        static $filters = ["escape" => 97, "raw" => 98];
        static $functions = ["encore_entry_script_tags" => 12, "pimcore_file_extension" => 90, "path" => 91];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['escape', 'raw'],
                ['encore_entry_script_tags', 'pimcore_file_extension', 'path'],
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
