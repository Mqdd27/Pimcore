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

/* @PimcoreAdmin/admin/misc/icon_list.html.twig */
class __TwigTemplate_f04d53f239db3e92a4edb51d6faeb724 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/misc/icon_list.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/misc/icon_list.html.twig"));

        // line 1
        $context["webRoot"] = Twig\Extension\CoreExtension::constant("PIMCORE_WEB_ROOT");
        // line 2
        yield "
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <title>Pimcore :: Icon list</title>
    <style type=\"text/css\">

        body {
            font-family: Arial;
            font-size: 12px;
        }

        .icons {
            margin: 0 auto;
            display:inline-block;
            padding-top: 20px;
        }
        .icon {
            text-align: center;
            width:100px;
            height:75px;
            margin: 0 10px 20px 0;
            float: left;
            font-size: 10px;
            word-wrap: break-word;
            padding-top: 5px;
            box-sizing: border-box;
        }

        .icon img:hover {
            cursor: copy;
        }

        #white .icon {
            background-color: #0C0F12;
        }

        #white .icon .label {
            color: #fff;
        }

        #flags .icon{
            height: 100px;
        }

        .info {
            text-align: center;
            clear: both;
            font-size: 22px;
        }

        .info small {
            font-size: 16px;
        }

        .icon img {
            width: 50px;
        }

        .language-icon img{
            width: 16px;
            cursor: copy;
        }

        .variant + .icon:not(.variant){
            border: 2px dotted green;
        }
        .variant{
            display: none;
            background-color: #eee;
        }

    </style>
</head>
<body>

<div class=\"info\">
    ";
        // line 80
        if (array_key_exists("source", $context)) {
            // line 81
            yield "        <small>";
            yield $this->sandbox->ensureToStringAllowed((isset($context["source"]) || array_key_exists("source", $context) ? $context["source"] : (function () { throw new RuntimeError('Variable "source" does not exist.', 81, $this->source); })()), 81, $this->source);
            yield "</small>
    ";
        }
        // line 83
        yield "</div>

<div id=\"";
        // line 85
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["type"]) || array_key_exists("type", $context) ? $context["type"] : (function () { throw new RuntimeError('Variable "type" does not exist.', 85, $this->source); })()), 85, $this->source), "html", null, true);
        yield "\" class=\"icons\">
    <div style=\"margin-bottom: 20px; text-align: left\">ℹ Click on icon to copy path to clipboard.</div>

    ";
        // line 88
        if (array_key_exists("extraInfo", $context)) {
            // line 89
            yield "        <div style=\"margin-bottom: 20px; text-align: left\">";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["extraInfo"]) || array_key_exists("extraInfo", $context) ? $context["extraInfo"] : (function () { throw new RuntimeError('Variable "extraInfo" does not exist.', 89, $this->source); })()), 89, $this->source), "html", null, true);
            yield "</div>
    ";
        }
        // line 91
        yield "
    ";
        // line 92
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["icons"]) || array_key_exists("icons", $context) ? $context["icons"] : (function () { throw new RuntimeError('Variable "icons" does not exist.', 92, $this->source); })()));
        $context['loop'] = [
          'parent' => $context['_parent'],
          'index0' => 0,
          'index'  => 1,
          'first'  => true,
        ];
        if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
            $length = count($context['_seq']);
            $context['loop']['revindex0'] = $length - 1;
            $context['loop']['revindex'] = $length;
            $context['loop']['length'] = $length;
            $context['loop']['last'] = 1 === $length;
        }
        foreach ($context['_seq'] as $context["_key"] => $context["icon"]) {
            // line 93
            yield "        ";
            $context["iconPath"] = Twig\Extension\CoreExtension::replace($this->sandbox->ensureToStringAllowed($context["icon"], 93, $this->source), [$this->sandbox->ensureToStringAllowed((isset($context["webRoot"]) || array_key_exists("webRoot", $context) ? $context["webRoot"] : (function () { throw new RuntimeError('Variable "webRoot" does not exist.', 93, $this->source); })()), 93, $this->source) => ""]);
            // line 94
            yield "        ";
            // line 98
            yield "        ";
            if (((CoreExtension::inFilter("-", (isset($context["iconPath"]) || array_key_exists("iconPath", $context) ? $context["iconPath"] : (function () { throw new RuntimeError('Variable "iconPath" does not exist.', 98, $this->source); })())) && (Twig\Extension\CoreExtension::length($this->env->getCharset(), CoreExtension::getAttribute($this->env, $this->source, Twig\Extension\CoreExtension::split($this->env->getCharset(), $this->extensions['Pimcore\Twig\Extension\HelpersExtension']->basenameFilter((isset($context["iconPath"]) || array_key_exists("iconPath", $context) ? $context["iconPath"] : (function () { throw new RuntimeError('Variable "iconPath" does not exist.', 98, $this->source); })())), "-"), 0, [], "array", false, false, true, 98)) > 3)) && ((isset($context["type"]) || array_key_exists("type", $context) ? $context["type"] : (function () { throw new RuntimeError('Variable "type" does not exist.', 98, $this->source); })()) == "twemoji"))) {
                // line 99
                yield "            <div class=\"icon variant\">
                ";
                // line 100
                yield $this->extensions['Pimcore\Bundle\AdminBundle\Twig\Extension\AdminExtension']->twemojiVariantIcon($this->sandbox->ensureToStringAllowed($context["icon"], 100, $this->source));
                yield "
                <div class=\"label\">";
                // line 101
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Pimcore\Twig\Extension\HelpersExtension']->basenameFilter($this->sandbox->ensureToStringAllowed((isset($context["iconPath"]) || array_key_exists("iconPath", $context) ? $context["iconPath"] : (function () { throw new RuntimeError('Variable "iconPath" does not exist.', 101, $this->source); })()), 101, $this->source)), "html", null, true);
                yield "</div>
            </div>
        ";
            } else {
                // line 104
                yield "            <div class=\"icon\">

                ";
                // line 106
                if (((isset($context["type"]) || array_key_exists("type", $context) ? $context["type"] : (function () { throw new RuntimeError('Variable "type" does not exist.', 106, $this->source); })()) == "flags")) {
                    // line 107
                    yield "                    ";
                    $context["country"] = Twig\Extension\CoreExtension::replace($this->extensions['Pimcore\Twig\Extension\HelpersExtension']->basenameFilter($this->sandbox->ensureToStringAllowed((isset($context["iconPath"]) || array_key_exists("iconPath", $context) ? $context["iconPath"] : (function () { throw new RuntimeError('Variable "iconPath" does not exist.', 107, $this->source); })()), 107, $this->source)), [".svg" => ""]);
                    // line 108
                    yield "                    <div class=\"country_name\" data-isocode=\"";
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["country"]) || array_key_exists("country", $context) ? $context["country"] : (function () { throw new RuntimeError('Variable "country" does not exist.', 108, $this->source); })()), 108, $this->source), "html", null, true);
                    yield "\"></div>
                ";
                }
                // line 110
                yield "
                ";
                // line 111
                if ((CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index", [], "any", false, false, true, 111) < 100)) {
                    // line 112
                    yield "                    ";
                    yield $this->extensions['Pimcore\Bundle\AdminBundle\Twig\Extension\AdminExtension']->inlineIcon($this->sandbox->ensureToStringAllowed($context["icon"], 112, $this->source));
                    yield "
                ";
                } else {
                    // line 114
                    yield "                    ";
                    yield $this->extensions['Pimcore\Bundle\AdminBundle\Twig\Extension\AdminExtension']->lazyIcon($this->sandbox->ensureToStringAllowed($context["icon"], 114, $this->source));
                    yield "
                ";
                }
                // line 116
                yield "
                <div class=\"label\">
                    ";
                // line 118
                yield ((CoreExtension::inFilter((isset($context["iconPath"]) || array_key_exists("iconPath", $context) ? $context["iconPath"] : (function () { throw new RuntimeError('Variable "iconPath" does not exist.', 118, $this->source); })()), (isset($context["iconsCss"]) || array_key_exists("iconsCss", $context) ? $context["iconsCss"] : (function () { throw new RuntimeError('Variable "iconsCss" does not exist.', 118, $this->source); })()))) ? ("*") : (""));
                yield "
                    ";
                // line 119
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Pimcore\Twig\Extension\HelpersExtension']->basenameFilter($this->sandbox->ensureToStringAllowed((isset($context["iconPath"]) || array_key_exists("iconPath", $context) ? $context["iconPath"] : (function () { throw new RuntimeError('Variable "iconPath" does not exist.', 119, $this->source); })()), 119, $this->source)), "html", null, true);
                yield "
                </div>
            </div>
        ";
            }
            // line 123
            yield "    ";
            ++$context['loop']['index0'];
            ++$context['loop']['index'];
            $context['loop']['first'] = false;
            if (isset($context['loop']['revindex0'], $context['loop']['revindex'])) {
                --$context['loop']['revindex0'];
                --$context['loop']['revindex'];
                $context['loop']['last'] = 0 === $context['loop']['revindex0'];
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['icon'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 124
        yield "</div>

<script
    src=\"https://code.jquery.com/jquery-3.7.1.min.js\"
    integrity=\"sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=\"
    crossorigin=\"anonymous\"></script>

<script ";
        // line 131
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["pimcore_csp"]) || array_key_exists("pimcore_csp", $context) ? $context["pimcore_csp"] : (function () { throw new RuntimeError('Variable "pimcore_csp" does not exist.', 131, $this->source); })()), "getNonceHtmlAttribute", [], "method", false, false, true, 131), 131, $this->source);
        yield ">
    \$( document ).ready(function() {

        // Add click event to copy icon path to clipboard
        \$('body').on('click', 'img', function () { copyStringToClipboard(\$(this).data('imgpath')); });

        // Twimoji only: clicking on icon with green border displays all its variants
        \$('.icon:not(.variant)').each(function () {
            let variants = \$(this).prevUntil('div.icon:not(.variant)');
            if (variants.length > 0) {
                \$(this).on('click', function () {
                    variants.each(function () {
                        if (!\$(this).is(':visible')) {
                            let img = \$(this).children('img');
                            img.attr('src', img.data('imgpath'));
                            \$(this).show();
                        }
                    });
                });
            }
        });

        // Country name from country ISO code
        const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
        \$('.country_name').each(function(){
            try {
                let country = regionNames.of(\$(this).data('isocode').toUpperCase());
                \$(this).text(country);
            } catch{
                // quick workaround for the ones that breaks it, eg. Scotland and Wels
                \$(this).text(\$(this).data('isocode'));
            }
        })

    });

    const copyStringToClipboard = function (str) {
        let selection = document.getSelection(),
            prevSelection = (selection.rangeCount > 0) ? selection.getRangeAt(0) : false,
            el;

        // create element and insert string
        el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';

        // insert element, select all text and copy
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        // restore previous selection
        if (prevSelection) {
            selection.removeAllRanges();
            selection.addRange(prevSelection);
        }
    };

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
        return "@PimcoreAdmin/admin/misc/icon_list.html.twig";
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
        return array (  269 => 131,  260 => 124,  246 => 123,  239 => 119,  235 => 118,  231 => 116,  225 => 114,  219 => 112,  217 => 111,  214 => 110,  208 => 108,  205 => 107,  203 => 106,  199 => 104,  193 => 101,  189 => 100,  186 => 99,  183 => 98,  181 => 94,  178 => 93,  161 => 92,  158 => 91,  152 => 89,  150 => 88,  144 => 85,  140 => 83,  134 => 81,  132 => 80,  52 => 2,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% set webRoot = constant('PIMCORE_WEB_ROOT') %}

<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <title>Pimcore :: Icon list</title>
    <style type=\"text/css\">

        body {
            font-family: Arial;
            font-size: 12px;
        }

        .icons {
            margin: 0 auto;
            display:inline-block;
            padding-top: 20px;
        }
        .icon {
            text-align: center;
            width:100px;
            height:75px;
            margin: 0 10px 20px 0;
            float: left;
            font-size: 10px;
            word-wrap: break-word;
            padding-top: 5px;
            box-sizing: border-box;
        }

        .icon img:hover {
            cursor: copy;
        }

        #white .icon {
            background-color: #0C0F12;
        }

        #white .icon .label {
            color: #fff;
        }

        #flags .icon{
            height: 100px;
        }

        .info {
            text-align: center;
            clear: both;
            font-size: 22px;
        }

        .info small {
            font-size: 16px;
        }

        .icon img {
            width: 50px;
        }

        .language-icon img{
            width: 16px;
            cursor: copy;
        }

        .variant + .icon:not(.variant){
            border: 2px dotted green;
        }
        .variant{
            display: none;
            background-color: #eee;
        }

    </style>
</head>
<body>

<div class=\"info\">
    {% if source is defined %}
        <small>{{ source|raw }}</small>
    {% endif %}
</div>

<div id=\"{{ type }}\" class=\"icons\">
    <div style=\"margin-bottom: 20px; text-align: left\">ℹ Click on icon to copy path to clipboard.</div>

    {% if extraInfo is defined %}
        <div style=\"margin-bottom: 20px; text-align: left\">{{ extraInfo }}</div>
    {% endif %}

    {% for icon in icons %}
        {% set iconPath = icon|replace({(webRoot): ''}) %}
        {#
            Any icon with basename that has a dash will be considered as a variant to avoid recurisvely searching for \"parent\" icon.
            It happens that all icon that have variants have at least a prefix of 4-5 characters.
        #}
        {% if ('-' in iconPath and iconPath|basename|split('-')[0]|length > 3) and (type =='twemoji') %}
            <div class=\"icon variant\">
                {{ icon | pimcore_twemoji_variant_icon | raw }}
                <div class=\"label\">{{ iconPath|basename }}</div>
            </div>
        {% else %}
            <div class=\"icon\">

                {% if type == 'flags' %}
                    {% set country = iconPath|basename|replace({'.svg': ''}) %}
                    <div class=\"country_name\" data-isocode=\"{{ country }}\"></div>
                {% endif %}

                {% if loop.index < 100 %}
                    {{ icon | pimcore_inline_icon | raw }}
                {% else %}
                    {{ icon | pimcore_lazy_icon | raw }}
                {% endif %}

                <div class=\"label\">
                    {{ iconPath in iconsCss  ? '*' : '' }}
                    {{ iconPath|basename }}
                </div>
            </div>
        {% endif %}
    {% endfor %}
</div>

<script
    src=\"https://code.jquery.com/jquery-3.7.1.min.js\"
    integrity=\"sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=\"
    crossorigin=\"anonymous\"></script>

<script {{ pimcore_csp.getNonceHtmlAttribute()|raw }}>
    \$( document ).ready(function() {

        // Add click event to copy icon path to clipboard
        \$('body').on('click', 'img', function () { copyStringToClipboard(\$(this).data('imgpath')); });

        // Twimoji only: clicking on icon with green border displays all its variants
        \$('.icon:not(.variant)').each(function () {
            let variants = \$(this).prevUntil('div.icon:not(.variant)');
            if (variants.length > 0) {
                \$(this).on('click', function () {
                    variants.each(function () {
                        if (!\$(this).is(':visible')) {
                            let img = \$(this).children('img');
                            img.attr('src', img.data('imgpath'));
                            \$(this).show();
                        }
                    });
                });
            }
        });

        // Country name from country ISO code
        const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
        \$('.country_name').each(function(){
            try {
                let country = regionNames.of(\$(this).data('isocode').toUpperCase());
                \$(this).text(country);
            } catch{
                // quick workaround for the ones that breaks it, eg. Scotland and Wels
                \$(this).text(\$(this).data('isocode'));
            }
        })

    });

    const copyStringToClipboard = function (str) {
        let selection = document.getSelection(),
            prevSelection = (selection.rangeCount > 0) ? selection.getRangeAt(0) : false,
            el;

        // create element and insert string
        el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';

        // insert element, select all text and copy
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        // restore previous selection
        if (prevSelection) {
            selection.removeAllRanges();
            selection.addRange(prevSelection);
        }
    };

</script>

</body>
</html>
", "@PimcoreAdmin/admin/misc/icon_list.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/misc/icon_list.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 1, "if" => 80, "for" => 92];
        static $filters = ["raw" => 81, "escape" => 85, "replace" => 93, "length" => 98, "split" => 98, "basename" => 98, "pimcore_twemoji_variant_icon" => 100, "pimcore_inline_icon" => 112, "pimcore_lazy_icon" => 114];
        static $functions = ["constant" => 1];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'for'],
                ['raw', 'escape', 'replace', 'length', 'split', 'basename', 'pimcore_twemoji_variant_icon', 'pimcore_inline_icon', 'pimcore_lazy_icon'],
                ['constant'],
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
