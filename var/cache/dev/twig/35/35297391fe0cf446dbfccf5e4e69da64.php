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

/* @PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig */
class __TwigTemplate_fe2f5cb4552970e423c9a853e8116b78 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig"));

        // line 2
        $context["language"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 2, $this->source); })()), "getProperty", ["language"], "method", false, false, true, 2);
        // line 3
        yield "<div class=\"data-table ";
        yield (((array_key_exists("cls", $context) &&  !(null === $context["cls"]))) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["cls"], 3, $this->source), "html", null, true)) : (""));
        yield "\">
    <table>
        ";
        // line 5
        if ($this->env->getTest('instanceof')->getCallable()((isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 5, $this->source); })()), "\\Pimcore\\Model\\DataObject\\Concrete")) {
            // line 6
            yield "            <tr>
                <th>";
            // line 7
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("class", [], "admin"), "html", null, true);
            yield "</th>
                <td>";
            // line 8
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 8, $this->source); })()), "getClassName", [], "method", false, false, true, 8), 8, $this->source), "html", null, true);
            yield " [";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 8, $this->source); })()), "getClassId", [], "method", false, false, true, 8), 8, $this->source), "html", null, true);
            yield "]</td>
            </tr>
        ";
        }
        // line 11
        yield "
        ";
        // line 12
        if ($this->env->getTest('instanceof')->getCallable()((isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 12, $this->source); })()), "\\Pimcore\\Model\\Asset")) {
            // line 13
            yield "            <tr>
                <th>";
            // line 14
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("mimetype", [], "admin"), "html", null, true);
            yield "</th>
                <td>";
            // line 15
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 15, $this->source); })()), "getMimeType", [], "method", false, false, true, 15), 15, $this->source), "html", null, true);
            yield "</td>
            </tr>
        ";
        }
        // line 18
        yield "
        ";
        // line 19
        if ( !Twig\Extension\CoreExtension::testEmpty((isset($context["language"]) || array_key_exists("language", $context) ? $context["language"] : (function () { throw new RuntimeError('Variable "language" does not exist.', 19, $this->source); })()))) {
            // line 20
            yield "            <tr>
                <th>";
            // line 21
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("language", [], "admin"), "html", null, true);
            yield "</th>
                <td style=\"padding-left: 40px; background: url(";
            // line 22
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Pimcore\Bundle\AdminBundle\Tool::getLanguageFlagFile($this->sandbox->ensureToStringAllowed((isset($context["language"]) || array_key_exists("language", $context) ? $context["language"] : (function () { throw new RuntimeError('Variable "language" does not exist.', 22, $this->source); })()), 22, $this->source), false), "html", null, true);
            yield ") left top no-repeat; background-size: 31px 21px;\">
                    ";
            // line 23
            $context["locales"] = Pimcore\Tool::getSupportedLocales();
            // line 24
            yield "                    ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["locales"]) || array_key_exists("locales", $context) ? $context["locales"] : (function () { throw new RuntimeError('Variable "locales" does not exist.', 24, $this->source); })()), (isset($context["language"]) || array_key_exists("language", $context) ? $context["language"] : (function () { throw new RuntimeError('Variable "language" does not exist.', 24, $this->source); })()), [], "array", false, false, true, 24), 24, $this->source), "html", null, true);
            yield "
                </td>
            </tr>
        ";
        }
        // line 28
        yield "
        ";
        // line 29
        if ($this->env->getTest('instanceof')->getCallable()((isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 29, $this->source); })()), "\\Pimcore\\Model\\Document\\Page")) {
            // line 30
            yield "            ";
            if ( !Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 30, $this->source); })()), "title", [], "any", false, false, true, 30))) {
                // line 31
                yield "            <tr>
                <th>";
                // line 32
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("title", [], "admin"), "html", null, true);
                yield "</th>
                <td>";
                // line 33
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 33, $this->source); })()), "title", [], "any", false, false, true, 33), 33, $this->source), "html", null, true);
                yield "</td>
            </tr>
            ";
            }
            // line 36
            yield "
            ";
            // line 37
            if ( !Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 37, $this->source); })()), "description", [], "any", false, false, true, 37))) {
                // line 38
                yield "                <tr>
                    <th>";
                // line 39
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("description", [], "admin"), "html", null, true);
                yield "</th>
                    <td>";
                // line 40
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 40, $this->source); })()), "description", [], "any", false, false, true, 40), 40, $this->source), "html", null, true);
                yield "</td>
                </tr>
            ";
            }
            // line 43
            yield "
            ";
            // line 44
            if ( !Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 44, $this->source); })()), "getProperty", ["navigation_name"], "method", false, false, true, 44))) {
                // line 45
                yield "                <tr>
                    <th>";
                // line 46
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("name", [], "admin"), "html", null, true);
                yield "</th>
                    <td>";
                // line 47
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 47, $this->source); })()), "getProperty", ["navigation_name"], "method", false, false, true, 47), 47, $this->source), "html", null, true);
                yield "</td>
                </tr>
            ";
            }
            // line 50
            yield "        ";
        }
        // line 51
        yield "
        ";
        // line 52
        $context["userOwnerId"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 52, $this->source); })()), "getUserOwner", [], "method", false, false, true, 52);
        // line 53
        yield "        ";
        $context["owner"] = (( !(null === (isset($context["userOwnerId"]) || array_key_exists("userOwnerId", $context) ? $context["userOwnerId"] : (function () { throw new RuntimeError('Variable "userOwnerId" does not exist.', 53, $this->source); })()))) ? (Pimcore\Model\User::getById($this->sandbox->ensureToStringAllowed((isset($context["userOwnerId"]) || array_key_exists("userOwnerId", $context) ? $context["userOwnerId"] : (function () { throw new RuntimeError('Variable "userOwnerId" does not exist.', 53, $this->source); })()), 53, $this->source))) : (null));
        // line 54
        yield "        ";
        if ($this->env->getTest('instanceof')->getCallable()((isset($context["owner"]) || array_key_exists("owner", $context) ? $context["owner"] : (function () { throw new RuntimeError('Variable "owner" does not exist.', 54, $this->source); })()), "\\Pimcore\\Model\\User")) {
            // line 55
            yield "            <tr>
                <th>";
            // line 56
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("owner", [], "admin"), "html", null, true);
            yield "</th>
                <td>";
            // line 57
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["owner"]) || array_key_exists("owner", $context) ? $context["owner"] : (function () { throw new RuntimeError('Variable "owner" does not exist.', 57, $this->source); })()), "name", [], "any", false, false, true, 57), 57, $this->source), "html", null, true);
            yield "</td>
            </tr>
        ";
        }
        // line 60
        yield "
        ";
        // line 61
        $context["userModificationId"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 61, $this->source); })()), "getUserModification", [], "method", false, false, true, 61);
        // line 62
        yield "        ";
        $context["editor"] = (( !(null === (isset($context["userModificationId"]) || array_key_exists("userModificationId", $context) ? $context["userModificationId"] : (function () { throw new RuntimeError('Variable "userModificationId" does not exist.', 62, $this->source); })()))) ? (Pimcore\Model\User::getById($this->sandbox->ensureToStringAllowed((isset($context["userModificationId"]) || array_key_exists("userModificationId", $context) ? $context["userModificationId"] : (function () { throw new RuntimeError('Variable "userModificationId" does not exist.', 62, $this->source); })()), 62, $this->source))) : (null));
        // line 63
        yield "        ";
        if ($this->env->getTest('instanceof')->getCallable()((isset($context["editor"]) || array_key_exists("editor", $context) ? $context["editor"] : (function () { throw new RuntimeError('Variable "editor" does not exist.', 63, $this->source); })()), "\\Pimcore\\Model\\User")) {
            // line 64
            yield "            <tr>
                <th>";
            // line 65
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("usermodification", [], "admin"), "html", null, true);
            yield "</th>
                <td>";
            // line 66
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["editor"]) || array_key_exists("editor", $context) ? $context["editor"] : (function () { throw new RuntimeError('Variable "editor" does not exist.', 66, $this->source); })()), "name", [], "any", false, false, true, 66), 66, $this->source), "html", null, true);
            yield "</td>
            </tr>
        ";
        }
        // line 69
        yield "
        <tr>
            <th>";
        // line 71
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("creationdate", [], "admin"), "html", null, true);
        yield "</th>
            <td>";
        // line 72
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 72, $this->source); })()), "getCreationDate", [], "method", false, false, true, 72), 72, $this->source), "Y-m-d H:i"), "html", null, true);
        yield "</td>
        </tr>
        <tr>
            <th>";
        // line 75
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("modificationdate", [], "admin"), "html", null, true);
        yield "</th>
            <td>";
        // line 76
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["element"]) || array_key_exists("element", $context) ? $context["element"] : (function () { throw new RuntimeError('Variable "element" does not exist.', 76, $this->source); })()), "getModificationDate", [], "method", false, false, true, 76), 76, $this->source), "Y-m-d H:i"), "html", null, true);
        yield "</td>
        </tr>
    </table>
</div>
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
        return "@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig";
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
        return array (  245 => 76,  241 => 75,  235 => 72,  231 => 71,  227 => 69,  221 => 66,  217 => 65,  214 => 64,  211 => 63,  208 => 62,  206 => 61,  203 => 60,  197 => 57,  193 => 56,  190 => 55,  187 => 54,  184 => 53,  182 => 52,  179 => 51,  176 => 50,  170 => 47,  166 => 46,  163 => 45,  161 => 44,  158 => 43,  152 => 40,  148 => 39,  145 => 38,  143 => 37,  140 => 36,  134 => 33,  130 => 32,  127 => 31,  124 => 30,  122 => 29,  119 => 28,  111 => 24,  109 => 23,  105 => 22,  101 => 21,  98 => 20,  96 => 19,  93 => 18,  87 => 15,  83 => 14,  80 => 13,  78 => 12,  75 => 11,  67 => 8,  63 => 7,  60 => 6,  58 => 5,  52 => 3,  50 => 2,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{# @var \$element \\Pimcore\\Model\\Element\\AbstractElement #}
{% set language = element.getProperty('language') %}
<div class=\"data-table {{ cls ?? '' }}\">
    <table>
        {% if element is instanceof ('\\\\Pimcore\\\\Model\\\\DataObject\\\\Concrete') %}
            <tr>
                <th>{{ 'class'|trans([],'admin') }}</th>
                <td>{{ element.getClassName() }} [{{ element.getClassId() }}]</td>
            </tr>
        {% endif %}

        {% if element is instanceof ('\\\\Pimcore\\\\Model\\\\Asset') %}
            <tr>
                <th>{{ 'mimetype'|trans([],'admin') }}</th>
                <td>{{ element.getMimeType() }}</td>
            </tr>
        {% endif %}

        {% if language is not empty %}
            <tr>
                <th>{{ 'language'|trans([],'admin') }}</th>
                <td style=\"padding-left: 40px; background: url({{ pimcore_language_flag(language, false) }}) left top no-repeat; background-size: 31px 21px;\">
                    {% set locales = pimcore_supported_locales() %}
                    {{ locales[language] }}
                </td>
            </tr>
        {% endif %}

        {% if element is instanceof('\\\\Pimcore\\\\Model\\\\Document\\\\Page') %}
            {% if element.title is not empty %}
            <tr>
                <th>{{ 'title'|trans([],'admin') }}</th>
                <td>{{ element.title }}</td>
            </tr>
            {% endif %}

            {% if element.description is not empty %}
                <tr>
                    <th>{{ 'description'|trans([],'admin') }}</th>
                    <td>{{ element.description }}</td>
                </tr>
            {% endif %}

            {% if element.getProperty('navigation_name') is not empty %}
                <tr>
                    <th>{{ 'name'|trans([],'admin') }}</th>
                    <td>{{ element.getProperty('navigation_name') }}</td>
                </tr>
            {% endif %}
        {% endif %}

        {% set userOwnerId = element.getUserOwner() %}
        {% set owner = userOwnerId is not null ? pimcore_user(userOwnerId) : null %}
        {% if owner is instanceof('\\\\Pimcore\\\\Model\\\\User') %}
            <tr>
                <th>{{ 'owner'|trans([],'admin') }}</th>
                <td>{{ owner.name }}</td>
            </tr>
        {% endif %}

        {% set userModificationId = element.getUserModification() %}
        {% set editor = userModificationId is not null ? pimcore_user(userModificationId) : null %}
        {% if editor is instanceof('\\\\Pimcore\\\\Model\\\\User') %}
            <tr>
                <th>{{ 'usermodification'|trans([],'admin') }}</th>
                <td>{{ editor.name }}</td>
            </tr>
        {% endif %}

        <tr>
            <th>{{ 'creationdate'|trans([],'admin') }}</th>
            <td>{{ element.getCreationDate()|date('Y-m-d H:i') }}</td>
        </tr>
        <tr>
            <th>{{ 'modificationdate'|trans([],'admin') }}</th>
            <td>{{ element.getModificationDate()|date('Y-m-d H:i') }}</td>
        </tr>
    </table>
</div>
", "@PimcoreAdmin/searchadmin/search/quicksearch/info_table.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/searchadmin/search/quicksearch/info_table.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 2, "if" => 5];
        static $filters = ["escape" => 3, "trans" => 7, "date" => 72];
        static $functions = ["pimcore_language_flag" => 22, "pimcore_supported_locales" => 23, "pimcore_user" => 53];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['escape', 'trans', 'date'],
                ['pimcore_language_flag', 'pimcore_supported_locales', 'pimcore_user'],
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
