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

/* @PimcoreAdmin/admin/data_object/data_object/preview_version.html.twig */
class __TwigTemplate_1fdb3fe58096040c3e3ae67b6974aec9 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/data_object/data_object/preview_version.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PimcoreAdmin/admin/data_object/data_object/preview_version.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/bundles/pimcoreadmin/css/object_versions.css\"/>
</head>

<body>


";
        // line 11
        $context["fields"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 11, $this->source); })()), "getClass", [], "method", false, false, true, 11), "getFieldDefinitions", [], "method", false, false, true, 11);
        // line 12
        yield "
<table class=\"preview\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">
    <tr>
        <th>Name</th>
        <th>Key</th>
        <th>Value</th>
    </tr>
    <tr class=\"system\">
        <td>Date</td>
        <td>modificationDate</td>
        <td>";
        // line 22
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 22, $this->source); })()), "getModificationDate", [], "method", false, false, true, 22), 22, $this->source), "Y-m-d H:i:s"), "html", null, true);
        yield "</td>
    </tr>
    <tr class=\"system\">
        <td>Path</td>
        <td>path</td>
        <td>";
        // line 27
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 27, $this->source); })()), "getRealFullPath", [], "method", false, false, true, 27), 27, $this->source), "html", null, true);
        yield "</td>
    </tr>
    <tr class=\"system\">
        <td>Published</td>
        <td>published</td>
        <td>";
        // line 32
        yield ((CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 32, $this->source); })()), "getPublished", [], "method", false, false, true, 32)) ? ("true") : ("false"));
        yield "</td>
    </tr>
    ";
        // line 34
        if ((isset($context["versionNote"]) || array_key_exists("versionNote", $context) ? $context["versionNote"] : (function () { throw new RuntimeError('Variable "versionNote" does not exist.', 34, $this->source); })())) {
            // line 35
            yield "        <tr class=\"system\">
            <td>Version Note</td>
            <td>&nbsp;</td>
            <td>";
            // line 38
            yield Twig\Extension\CoreExtension::nl2br($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed((isset($context["versionNote"]) || array_key_exists("versionNote", $context) ? $context["versionNote"] : (function () { throw new RuntimeError('Variable "versionNote" does not exist.', 38, $this->source); })()), 38, $this->source), "html", null, true));
            yield "</td>
        </tr>
    ";
        }
        // line 41
        yield "
    <tr class=\"\">
        <td colspan=\"3\">&nbsp;</td>
    </tr>
    ";
        // line 45
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["fields"]) || array_key_exists("fields", $context) ? $context["fields"] : (function () { throw new RuntimeError('Variable "fields" does not exist.', 45, $this->source); })()));
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
        foreach ($context['_seq'] as $context["fieldName"] => $context["definition"]) {
            // line 46
            yield "        ";
            if ($this->env->getTest('instanceof')->getCallable()($context["definition"], "\\Pimcore\\Model\\DataObject\\ClassDefinition\\Data\\Localizedfields")) {
                // line 47
                yield "            ";
                $context['_parent'] = $context;
                $context['_seq'] = CoreExtension::ensureTraversable((isset($context["validLanguages"]) || array_key_exists("validLanguages", $context) ? $context["validLanguages"] : (function () { throw new RuntimeError('Variable "validLanguages" does not exist.', 47, $this->source); })()));
                foreach ($context['_seq'] as $context["_key"] => $context["language"]) {
                    // line 48
                    yield "                ";
                    $context['_parent'] = $context;
                    $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["definition"], "getFieldDefinitions", [], "method", false, false, true, 48));
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
                    foreach ($context['_seq'] as $context["_key"] => $context["lfd"]) {
                        // line 49
                        yield "                    <tr ";
                        if ((CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index", [], "any", false, false, true, 49) % 2 != 0)) {
                            yield "class=\"odd\"";
                        }
                        yield ">
                        <td>";
                        // line 50
                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getTitle", [], "method", false, false, true, 50), 50, $this->source), [], "admin"), "html", null, true);
                        yield " (";
                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["language"], 50, $this->source), "html", null, true);
                        yield ")</td>
                        <td>";
                        // line 51
                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getName", [], "method", false, false, true, 51), 51, $this->source), "html", null, true);
                        yield "</td>
                        <td>
                                ";
                        // line 53
                        if (CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 53, $this->source); })()), "getValueForFieldName", [$context["fieldName"]], "method", false, false, true, 53)) {
                            // line 54
                            yield "                                    ";
                            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getVersionPreview", [CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 54, $this->source); })()), "getValueForFieldName", [$context["fieldName"]], "method", false, false, true, 54), "getLocalizedValue", [CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getName", [], "method", false, false, true, 54), $context["language"]], "method", false, false, true, 54)], "method", false, false, true, 54), 54, $this->source);
                            yield "
                                ";
                        }
                        // line 56
                        yield "                        </td>
                    </tr>
                ";
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
                    unset($context['_seq'], $context['_key'], $context['lfd'], $context['_parent'], $context['loop']);
                    $context = array_intersect_key($context, $_parent) + $_parent;
                    // line 59
                    yield "            ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_key'], $context['language'], $context['_parent']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 60
                yield "        ";
            } elseif ($this->env->getTest('instanceof')->getCallable()($context["definition"], "\\Pimcore\\Model\\DataObject\\ClassDefinition\\Data\\Objectbricks")) {
                // line 61
                yield "            ";
                $context['_parent'] = $context;
                $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["definition"], "getAllowedTypes", [], "method", false, false, true, 61));
                foreach ($context['_seq'] as $context["_key"] => $context["asAllowedType"]) {
                    // line 62
                    yield "                ";
                    $context["collectionDef"] = Pimcore\Model\DataObject\Objectbrick\Definition::getByKey($this->sandbox->ensureToStringAllowed($context["asAllowedType"], 62, $this->source));
                    // line 63
                    yield "
                ";
                    // line 64
                    $context['_parent'] = $context;
                    $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, (isset($context["collectionDef"]) || array_key_exists("collectionDef", $context) ? $context["collectionDef"] : (function () { throw new RuntimeError('Variable "collectionDef" does not exist.', 64, $this->source); })()), "getFieldDefinitions", [], "method", false, false, true, 64));
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
                    foreach ($context['_seq'] as $context["_key"] => $context["lfd"]) {
                        // line 65
                        yield "                    ";
                        $context["value"] = null;
                        // line 66
                        yield "
                    ";
                        // line 67
                        $context["fieldGetter"] = ("get" . Twig\Extension\CoreExtension::capitalize($this->env->getCharset(), $this->sandbox->ensureToStringAllowed($context["fieldName"], 67, $this->source)));
                        // line 68
                        yield "                    ";
                        $context["brick"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 68, $this->source); })()), (isset($context["fieldGetter"]) || array_key_exists("fieldGetter", $context) ? $context["fieldGetter"] : (function () { throw new RuntimeError('Variable "fieldGetter" does not exist.', 68, $this->source); })()), [], "any", false, false, true, 68);
                        // line 69
                        yield "
                    ";
                        // line 70
                        if ( !Twig\Extension\CoreExtension::testEmpty((isset($context["brick"]) || array_key_exists("brick", $context) ? $context["brick"] : (function () { throw new RuntimeError('Variable "brick" does not exist.', 70, $this->source); })()))) {
                            // line 71
                            yield "                        ";
                            $context["allowedMethod"] = ("get" . $this->sandbox->ensureToStringAllowed($context["asAllowedType"], 71, $this->source));
                            // line 72
                            yield "                        ";
                            $context["brickValue"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["brick"]) || array_key_exists("brick", $context) ? $context["brick"] : (function () { throw new RuntimeError('Variable "brick" does not exist.', 72, $this->source); })()), (isset($context["allowedMethod"]) || array_key_exists("allowedMethod", $context) ? $context["allowedMethod"] : (function () { throw new RuntimeError('Variable "allowedMethod" does not exist.', 72, $this->source); })()), [], "any", false, false, true, 72);
                            // line 73
                            yield "
                        ";
                            // line 74
                            if ($this->env->getTest('instanceof')->getCallable()($context["lfd"], "\\Pimcore\\Model\\DataObject\\ClassDefinition\\Data\\Localizedfields")) {
                                // line 75
                                yield "                            ";
                                $context['_parent'] = $context;
                                $context['_seq'] = CoreExtension::ensureTraversable((isset($context["validLanguages"]) || array_key_exists("validLanguages", $context) ? $context["validLanguages"] : (function () { throw new RuntimeError('Variable "validLanguages" does not exist.', 75, $this->source); })()));
                                foreach ($context['_seq'] as $context["_key"] => $context["language"]) {
                                    // line 76
                                    yield "                                ";
                                    $context['_parent'] = $context;
                                    $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getFieldDefinitions", [], "method", false, false, true, 76));
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
                                    foreach ($context['_seq'] as $context["_key"] => $context["localizedFieldDefinition"]) {
                                        // line 77
                                        yield "                                    <tr ";
                                        if ((CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index", [], "any", false, false, true, 77) % 2 != 0)) {
                                            yield "class=\"odd\"";
                                        }
                                        yield ">
                                        <td>";
                                        // line 78
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["localizedFieldDefinition"], "getTitle", [], "method", false, false, true, 78), 78, $this->source), [], "admin"), "html", null, true);
                                        yield " (";
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["language"], 78, $this->source), "html", null, true);
                                        yield ")</td>
                                        <td>";
                                        // line 79
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["localizedFieldDefinition"], "getName", [], "method", false, false, true, 79), 79, $this->source), "html", null, true);
                                        yield "</td>
                                        <td>
                                            ";
                                        // line 81
                                        if ((isset($context["brickValue"]) || array_key_exists("brickValue", $context) ? $context["brickValue"] : (function () { throw new RuntimeError('Variable "brickValue" does not exist.', 81, $this->source); })())) {
                                            // line 82
                                            yield "                                                ";
                                            $context["localizedBrickValues"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["brickValue"]) || array_key_exists("brickValue", $context) ? $context["brickValue"] : (function () { throw new RuntimeError('Variable "brickValue" does not exist.', 82, $this->source); })()), "getLocalizedFields", [], "method", false, false, true, 82);
                                            // line 83
                                            yield "                                                ";
                                            $context["localizedBrickValue"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["localizedBrickValues"]) || array_key_exists("localizedBrickValues", $context) ? $context["localizedBrickValues"] : (function () { throw new RuntimeError('Variable "localizedBrickValues" does not exist.', 83, $this->source); })()), "getLocalizedValue", [CoreExtension::getAttribute($this->env, $this->source, $context["localizedFieldDefinition"], "getName", [], "method", false, false, true, 83), $context["language"]], "method", false, false, true, 83);
                                            // line 84
                                            yield "                                                ";
                                            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["localizedFieldDefinition"], "getVersionPreview", [(isset($context["localizedBrickValue"]) || array_key_exists("localizedBrickValue", $context) ? $context["localizedBrickValue"] : (function () { throw new RuntimeError('Variable "localizedBrickValue" does not exist.', 84, $this->source); })())], "method", false, false, true, 84), 84, $this->source);
                                            yield "
                                            ";
                                        }
                                        // line 86
                                        yield "                                        </td>
                                    </tr>
                                ";
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
                                    unset($context['_seq'], $context['_key'], $context['localizedFieldDefinition'], $context['_parent'], $context['loop']);
                                    $context = array_intersect_key($context, $_parent) + $_parent;
                                    // line 89
                                    yield "                            ";
                                }
                                $_parent = $context['_parent'];
                                unset($context['_seq'], $context['_key'], $context['language'], $context['_parent']);
                                $context = array_intersect_key($context, $_parent) + $_parent;
                                // line 90
                                yield "                        ";
                            } else {
                                // line 91
                                yield "                            ";
                                if ((isset($context["brickValue"]) || array_key_exists("brickValue", $context) ? $context["brickValue"] : (function () { throw new RuntimeError('Variable "brickValue" does not exist.', 91, $this->source); })())) {
                                    // line 92
                                    yield "                                ";
                                    $context["value"] = CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getVersionPreview", [CoreExtension::getAttribute($this->env, $this->source, (isset($context["brickValue"]) || array_key_exists("brickValue", $context) ? $context["brickValue"] : (function () { throw new RuntimeError('Variable "brickValue" does not exist.', 92, $this->source); })()), "getValueForFieldName", [CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getName", [], "method", false, false, true, 92)], "method", false, false, true, 92)], "method", false, false, true, 92);
                                    // line 93
                                    yield "                            ";
                                }
                                // line 94
                                yield "                            <tr ";
                                if ((CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index", [], "any", false, false, true, 94) % 2 != 0)) {
                                    yield "class=\"odd\"";
                                }
                                yield ">
                                <td>";
                                // line 95
                                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(((Twig\Extension\CoreExtension::capitalize($this->env->getCharset(), $this->sandbox->ensureToStringAllowed($context["asAllowedType"], 95, $this->source)) . " - ") . $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getTitle", [], "method", false, false, true, 95), 95, $this->source), [], "admin")), "html", null, true);
                                yield "</td>
                                <td>";
                                // line 96
                                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getName", [], "method", false, false, true, 96), 96, $this->source), "html", null, true);
                                yield "</td>
                                <td>";
                                // line 97
                                yield $this->sandbox->ensureToStringAllowed((isset($context["value"]) || array_key_exists("value", $context) ? $context["value"] : (function () { throw new RuntimeError('Variable "value" does not exist.', 97, $this->source); })()), 97, $this->source);
                                yield "</td>
                            </tr>
                        ";
                            }
                            // line 100
                            yield "                    ";
                        }
                        // line 101
                        yield "
                ";
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
                    unset($context['_seq'], $context['_key'], $context['lfd'], $context['_parent'], $context['loop']);
                    $context = array_intersect_key($context, $_parent) + $_parent;
                    // line 103
                    yield "            ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_key'], $context['asAllowedType'], $context['_parent']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 104
                yield "        ";
            } elseif ($this->env->getTest('instanceof')->getCallable()($context["definition"], "\\Pimcore\\Model\\DataObject\\ClassDefinition\\Data\\Classificationstore")) {
                // line 105
                yield "            ";
                $context["storedata"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 105, $this->source); })()), "getValueForFieldName", [$context["fieldName"]], "method", false, false, true, 105);
                // line 106
                yield "            ";
                $context["activeGroups"] = [];
                // line 107
                yield "
            ";
                // line 108
                if ((isset($context["storedata"]) || array_key_exists("storedata", $context) ? $context["storedata"] : (function () { throw new RuntimeError('Variable "storedata" does not exist.', 108, $this->source); })())) {
                    // line 109
                    yield "                ";
                    $context["activeGroups"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["storedata"]) || array_key_exists("storedata", $context) ? $context["storedata"] : (function () { throw new RuntimeError('Variable "storedata" does not exist.', 109, $this->source); })()), "getActiveGroups", [], "method", false, false, true, 109);
                    // line 110
                    yield "            ";
                }
                // line 111
                yield "            ";
                if ( !Twig\Extension\CoreExtension::testEmpty((isset($context["activeGroups"]) || array_key_exists("activeGroups", $context) ? $context["activeGroups"] : (function () { throw new RuntimeError('Variable "activeGroups" does not exist.', 111, $this->source); })()))) {
                    // line 112
                    yield "                ";
                    $context["languages"] = ["default"];
                    // line 113
                    yield "                ";
                    if (CoreExtension::getAttribute($this->env, $this->source, $context["definition"], "isLocalized", [], "method", false, false, true, 113)) {
                        // line 114
                        yield "                    ";
                        $context["languages"] = Twig\Extension\CoreExtension::merge($this->sandbox->ensureToStringAllowed((isset($context["validLanguages"]) || array_key_exists("validLanguages", $context) ? $context["validLanguages"] : (function () { throw new RuntimeError('Variable "validLanguages" does not exist.', 114, $this->source); })()), 114, $this->source), $this->sandbox->ensureToStringAllowed((isset($context["languages"]) || array_key_exists("languages", $context) ? $context["languages"] : (function () { throw new RuntimeError('Variable "languages" does not exist.', 114, $this->source); })()), 114, $this->source));
                        // line 115
                        yield "                ";
                    }
                    // line 116
                    yield "
                ";
                    // line 117
                    $context['_parent'] = $context;
                    $context['_seq'] = CoreExtension::ensureTraversable(Twig\Extension\CoreExtension::filter($this->env, (isset($context["activeGroups"]) || array_key_exists("activeGroups", $context) ? $context["activeGroups"] : (function () { throw new RuntimeError('Variable "activeGroups" does not exist.', 117, $this->source); })()), function ($__enabled__, $__activeGroupId__) use ($context, $macros) { $context["enabled"] = $__enabled__; $context["activeGroupId"] = $__activeGroupId__; return  !Twig\Extension\CoreExtension::testEmpty(CoreExtension::getAttribute($this->env, $this->source, (isset($context["activeGroups"]) || array_key_exists("activeGroups", $context) ? $context["activeGroups"] : (function () { throw new RuntimeError('Variable "activeGroups" does not exist.', 117, $this->source); })()), $context["activeGroupId"], [], "array", false, false, true, 117)); }));
                    foreach ($context['_seq'] as $context["activeGroupId"] => $context["enabled"]) {
                        // line 118
                        yield "                    ";
                        $context["groupDefinition"] = Pimcore\Model\DataObject\Classificationstore\GroupConfig::getById($this->sandbox->ensureToStringAllowed($context["activeGroupId"], 118, $this->source));
                        // line 119
                        yield "                    ";
                        if ( !Twig\Extension\CoreExtension::testEmpty((isset($context["groupDefinition"]) || array_key_exists("groupDefinition", $context) ? $context["groupDefinition"] : (function () { throw new RuntimeError('Variable "groupDefinition" does not exist.', 119, $this->source); })()))) {
                            // line 120
                            yield "                        ";
                            $context["keyGroupRelations"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["groupDefinition"]) || array_key_exists("groupDefinition", $context) ? $context["groupDefinition"] : (function () { throw new RuntimeError('Variable "groupDefinition" does not exist.', 120, $this->source); })()), "getRelations", [], "method", false, false, true, 120);
                            // line 121
                            yield "
                        ";
                            // line 122
                            $context['_parent'] = $context;
                            $context['_seq'] = CoreExtension::ensureTraversable((isset($context["keyGroupRelations"]) || array_key_exists("keyGroupRelations", $context) ? $context["keyGroupRelations"] : (function () { throw new RuntimeError('Variable "keyGroupRelations" does not exist.', 122, $this->source); })()));
                            foreach ($context['_seq'] as $context["_key"] => $context["keyGroupRelation"]) {
                                // line 123
                                yield "                            ";
                                $context["keyDef"] = $this->extensions['Pimcore\Twig\Extension\PimcoreObjectExtension']->getFieldDefinitionFromJson($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["keyGroupRelation"], "getDefinition", [], "method", false, false, true, 123), 123, $this->source), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["keyGroupRelation"], "getType", [], "method", false, false, true, 123), 123, $this->source));
                                // line 124
                                yield "
                            ";
                                // line 125
                                if ( !Twig\Extension\CoreExtension::testEmpty((isset($context["keyDef"]) || array_key_exists("keyDef", $context) ? $context["keyDef"] : (function () { throw new RuntimeError('Variable "keyDef" does not exist.', 125, $this->source); })()))) {
                                    // line 126
                                    yield "                                ";
                                    $context['_parent'] = $context;
                                    $context['_seq'] = CoreExtension::ensureTraversable((isset($context["languages"]) || array_key_exists("languages", $context) ? $context["languages"] : (function () { throw new RuntimeError('Variable "languages" does not exist.', 126, $this->source); })()));
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
                                    foreach ($context['_seq'] as $context["_key"] => $context["language"]) {
                                        // line 127
                                        yield "                                    ";
                                        $context["keyData"] = (((isset($context["storedata"]) || array_key_exists("storedata", $context) ? $context["storedata"] : (function () { throw new RuntimeError('Variable "storedata" does not exist.', 127, $this->source); })())) ? (CoreExtension::getAttribute($this->env, $this->source, (isset($context["storedata"]) || array_key_exists("storedata", $context) ? $context["storedata"] : (function () { throw new RuntimeError('Variable "storedata" does not exist.', 127, $this->source); })()), "getLocalizedKeyValue", [$context["activeGroupId"], CoreExtension::getAttribute($this->env, $this->source, $context["keyGroupRelation"], "getKeyId", [], "method", false, false, true, 127), $context["language"], true, true], "method", false, false, true, 127)) : (null));
                                        // line 128
                                        yield "
                                    ";
                                        // line 129
                                        $context["preview"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["keyDef"]) || array_key_exists("keyDef", $context) ? $context["keyDef"] : (function () { throw new RuntimeError('Variable "keyDef" does not exist.', 129, $this->source); })()), "getVersionPreview", [(isset($context["keyData"]) || array_key_exists("keyData", $context) ? $context["keyData"] : (function () { throw new RuntimeError('Variable "keyData" does not exist.', 129, $this->source); })())], "method", false, false, true, 129);
                                        // line 130
                                        yield "                                    <tr ";
                                        if ((CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index", [], "any", false, false, true, 130) % 2 != 0)) {
                                            yield "class=\"odd\"";
                                        }
                                        yield ">
                                        <td>";
                                        // line 131
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["definition"], "getTitle", [], "method", false, false, true, 131), 131, $this->source), [], "admin"), "html", null, true);
                                        yield "</td>
                                        <td>";
                                        // line 132
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, (isset($context["groupDefinition"]) || array_key_exists("groupDefinition", $context) ? $context["groupDefinition"] : (function () { throw new RuntimeError('Variable "groupDefinition" does not exist.', 132, $this->source); })()), "getName", [], "method", false, false, true, 132), 132, $this->source) . "-") . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["keyGroupRelation"], "getName", [], "method", false, false, true, 132), 132, $this->source)), "html", null, true);
                                        yield " ";
                                        yield ((CoreExtension::getAttribute($this->env, $this->source, $context["definition"], "isLocalized", [], "method", false, false, true, 132)) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(("/ " . $this->sandbox->ensureToStringAllowed($context["language"], 132, $this->source)), "html", null, true)) : (""));
                                        yield "</td>
                                        ";
                                        // line 133
                                        if (( !array_key_exists("isImportPreview", $context) ||  !array_key_exists("isNew", $context))) {
                                            // line 134
                                            yield "                                            <td>";
                                            yield $this->sandbox->ensureToStringAllowed((isset($context["preview"]) || array_key_exists("preview", $context) ? $context["preview"] : (function () { throw new RuntimeError('Variable "preview" does not exist.', 134, $this->source); })()), 134, $this->source);
                                            yield "</td>
                                        ";
                                        }
                                        // line 136
                                        yield "                                    </tr>
                                ";
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
                                    unset($context['_seq'], $context['_key'], $context['language'], $context['_parent'], $context['loop']);
                                    $context = array_intersect_key($context, $_parent) + $_parent;
                                    // line 138
                                    yield "                            ";
                                }
                                // line 139
                                yield "                        ";
                            }
                            $_parent = $context['_parent'];
                            unset($context['_seq'], $context['_key'], $context['keyGroupRelation'], $context['_parent']);
                            $context = array_intersect_key($context, $_parent) + $_parent;
                            // line 140
                            yield "                    ";
                        }
                        // line 141
                        yield "                ";
                    }
                    $_parent = $context['_parent'];
                    unset($context['_seq'], $context['activeGroupId'], $context['enabled'], $context['_parent']);
                    $context = array_intersect_key($context, $_parent) + $_parent;
                    // line 142
                    yield "            ";
                }
                // line 143
                yield "        ";
            } elseif ($this->env->getTest('instanceof')->getCallable()($context["definition"], "\\Pimcore\\Model\\DataObject\\ClassDefinition\\Data\\Fieldcollections")) {
                // line 144
                yield "            ";
                $context["fields"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 144, $this->source); })()), "get", [$context["fieldName"]], "method", false, false, true, 144);
                // line 145
                yield "            ";
                $context["fieldDefinitions"] = null;
                // line 146
                yield "            ";
                $context["fieldItems"] = null;
                // line 147
                yield "
            ";
                // line 148
                if ((isset($context["fields"]) || array_key_exists("fields", $context) ? $context["fields"] : (function () { throw new RuntimeError('Variable "fields" does not exist.', 148, $this->source); })())) {
                    // line 149
                    yield "                ";
                    $context["fieldDefinitions"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["fields"]) || array_key_exists("fields", $context) ? $context["fields"] : (function () { throw new RuntimeError('Variable "fields" does not exist.', 149, $this->source); })()), "getItemDefinitions", [], "method", false, false, true, 149);
                    // line 150
                    yield "                ";
                    $context["fieldItems"] = CoreExtension::getAttribute($this->env, $this->source, (isset($context["fields"]) || array_key_exists("fields", $context) ? $context["fields"] : (function () { throw new RuntimeError('Variable "fields" does not exist.', 150, $this->source); })()), "getItems", [], "method", false, false, true, 150);
                    // line 151
                    yield "            ";
                }
                // line 152
                yield "
            ";
                // line 153
                if ((is_iterable((isset($context["fieldItems"]) || array_key_exists("fieldItems", $context) ? $context["fieldItems"] : (function () { throw new RuntimeError('Variable "fieldItems" does not exist.', 153, $this->source); })())) && (Twig\Extension\CoreExtension::length($this->env->getCharset(), (isset($context["fieldItems"]) || array_key_exists("fieldItems", $context) ? $context["fieldItems"] : (function () { throw new RuntimeError('Variable "fieldItems" does not exist.', 153, $this->source); })())) > 0))) {
                    // line 154
                    yield "                ";
                    $context['_parent'] = $context;
                    $context['_seq'] = CoreExtension::ensureTraversable((isset($context["fieldItems"]) || array_key_exists("fieldItems", $context) ? $context["fieldItems"] : (function () { throw new RuntimeError('Variable "fieldItems" does not exist.', 154, $this->source); })()));
                    foreach ($context['_seq'] as $context["fkey"] => $context["fieldItem"]) {
                        // line 155
                        yield "                    ";
                        $context["fieldKeys"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["fieldDefinitions"]) || array_key_exists("fieldDefinitions", $context) ? $context["fieldDefinitions"] : (function () { throw new RuntimeError('Variable "fieldDefinitions" does not exist.', 155, $this->source); })()), CoreExtension::getAttribute($this->env, $this->source, $context["fieldItem"], "getType", [], "method", false, false, true, 155), [], "array", false, false, true, 155), "getFieldDefinitions", [], "method", false, false, true, 155);
                        // line 156
                        yield "                    ";
                        $context['_parent'] = $context;
                        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["fieldKeys"]) || array_key_exists("fieldKeys", $context) ? $context["fieldKeys"] : (function () { throw new RuntimeError('Variable "fieldKeys" does not exist.', 156, $this->source); })()));
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
                        foreach ($context['_seq'] as $context["_key"] => $context["fieldKey"]) {
                            // line 157
                            yield "                        ";
                            if ($this->env->getTest('instanceof')->getCallable()($context["fieldKey"], "\\Pimcore\\Model\\DataObject\\ClassDefinition\\Data\\Localizedfields")) {
                                // line 158
                                yield "                            ";
                                $context['_parent'] = $context;
                                $context['_seq'] = CoreExtension::ensureTraversable((isset($context["validLanguages"]) || array_key_exists("validLanguages", $context) ? $context["validLanguages"] : (function () { throw new RuntimeError('Variable "validLanguages" does not exist.', 158, $this->source); })()));
                                foreach ($context['_seq'] as $context["_key"] => $context["language"]) {
                                    // line 159
                                    yield "                                ";
                                    $context['_parent'] = $context;
                                    $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["fieldKey"], "getFieldDefinitions", [], "method", false, false, true, 159));
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
                                    foreach ($context['_seq'] as $context["_key"] => $context["lfd"]) {
                                        // line 160
                                        yield "                                    <tr ";
                                        if ((CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index", [], "any", false, false, true, 160) % 2 != 0)) {
                                            yield "class=\"odd\"";
                                        }
                                        yield ">
                                        <td>";
                                        // line 161
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getTitle", [], "method", false, false, true, 161), 161, $this->source), [], "admin"), "html", null, true);
                                        yield " (";
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["language"], 161, $this->source), "html", null, true);
                                        yield ")</td>
                                        <td>";
                                        // line 162
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["fieldItem"], "fieldName", [], "any", false, false, true, 162), 162, $this->source), "html", null, true);
                                        yield " - ";
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getName", [], "method", false, false, true, 162), 162, $this->source), "html", null, true);
                                        yield "/";
                                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed($context["language"], 162, $this->source), "html", null, true);
                                        yield "</td>
                                        <td>";
                                        // line 163
                                        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getVersionPreview", [CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["fieldItem"], "Localizedfields", [], "any", false, false, true, 163), "getLocalizedValue", [CoreExtension::getAttribute($this->env, $this->source, $context["lfd"], "getName", [], "method", false, false, true, 163), $context["language"]], "method", false, false, true, 163)], "method", false, false, true, 163), 163, $this->source);
                                        yield "</td>
                                    </tr>
                                ";
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
                                    unset($context['_seq'], $context['_key'], $context['lfd'], $context['_parent'], $context['loop']);
                                    $context = array_intersect_key($context, $_parent) + $_parent;
                                    // line 166
                                    yield "                            ";
                                }
                                $_parent = $context['_parent'];
                                unset($context['_seq'], $context['_key'], $context['language'], $context['_parent']);
                                $context = array_intersect_key($context, $_parent) + $_parent;
                                // line 167
                                yield "                        ";
                            } else {
                                // line 168
                                yield "                            ";
                                $context["value"] = CoreExtension::getAttribute($this->env, $this->source, $context["fieldItem"], "get", [CoreExtension::getAttribute($this->env, $this->source, $context["fieldKey"], "getName", [], "method", false, false, true, 168)], "method", false, false, true, 168);
                                // line 169
                                yield "                            <tr ";
                                if ((CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index", [], "any", false, false, true, 169) % 2 != 0)) {
                                    yield "class=\"odd\"";
                                }
                                yield ">
                                <td>";
                                // line 170
                                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["fieldItem"], "getType", [], "method", false, false, true, 170), 170, $this->source) . " - ") . $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["fieldKey"], "getTitle", [], "method", false, false, true, 170), 170, $this->source), [], "admin")), "html", null, true);
                                yield "</td>
                                <td>";
                                // line 171
                                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["fieldKey"], "getName", [], "method", false, false, true, 171), 171, $this->source), "html", null, true);
                                yield "</td>
                                <td>";
                                // line 172
                                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["fieldKey"], "getVersionPreview", [(isset($context["value"]) || array_key_exists("value", $context) ? $context["value"] : (function () { throw new RuntimeError('Variable "value" does not exist.', 172, $this->source); })())], "method", false, false, true, 172), 172, $this->source);
                                yield "</td>
                            </tr>
                        ";
                            }
                            // line 175
                            yield "                    ";
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
                        unset($context['_seq'], $context['_key'], $context['fieldKey'], $context['_parent'], $context['loop']);
                        $context = array_intersect_key($context, $_parent) + $_parent;
                        // line 176
                        yield "                ";
                    }
                    $_parent = $context['_parent'];
                    unset($context['_seq'], $context['fkey'], $context['fieldItem'], $context['_parent']);
                    $context = array_intersect_key($context, $_parent) + $_parent;
                    // line 177
                    yield "            ";
                }
                // line 178
                yield "        ";
            } else {
                // line 179
                yield "            <tr ";
                if ((CoreExtension::getAttribute($this->env, $this->source, $context["loop"], "index", [], "any", false, false, true, 179) % 2 != 0)) {
                    yield "class=\"odd\"";
                }
                yield ">
                <td>";
                // line 180
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["definition"], "getTitle", [], "method", false, false, true, 180), 180, $this->source), [], "admin"), "html", null, true);
                yield "</td>
                <td>";
                // line 181
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["definition"], "getName", [], "method", false, false, true, 181), 181, $this->source), "html", null, true);
                yield "</td>
                <td>";
                // line 182
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["definition"], "getVersionPreview", [CoreExtension::getAttribute($this->env, $this->source, (isset($context["object"]) || array_key_exists("object", $context) ? $context["object"] : (function () { throw new RuntimeError('Variable "object" does not exist.', 182, $this->source); })()), "getValueForFieldName", [$context["fieldName"]], "method", false, false, true, 182)], "method", false, false, true, 182), 182, $this->source);
                yield "</td>
            </tr>
        ";
            }
            // line 185
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
        unset($context['_seq'], $context['fieldName'], $context['definition'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 186
        yield "</table>
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
        return "@PimcoreAdmin/admin/data_object/data_object/preview_version.html.twig";
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
        return array (  767 => 186,  753 => 185,  747 => 182,  743 => 181,  739 => 180,  732 => 179,  729 => 178,  726 => 177,  720 => 176,  706 => 175,  700 => 172,  696 => 171,  692 => 170,  685 => 169,  682 => 168,  679 => 167,  673 => 166,  656 => 163,  648 => 162,  642 => 161,  635 => 160,  617 => 159,  612 => 158,  609 => 157,  591 => 156,  588 => 155,  583 => 154,  581 => 153,  578 => 152,  575 => 151,  572 => 150,  569 => 149,  567 => 148,  564 => 147,  561 => 146,  558 => 145,  555 => 144,  552 => 143,  549 => 142,  543 => 141,  540 => 140,  534 => 139,  531 => 138,  516 => 136,  510 => 134,  508 => 133,  502 => 132,  498 => 131,  491 => 130,  489 => 129,  486 => 128,  483 => 127,  465 => 126,  463 => 125,  460 => 124,  457 => 123,  453 => 122,  450 => 121,  447 => 120,  444 => 119,  441 => 118,  437 => 117,  434 => 116,  431 => 115,  428 => 114,  425 => 113,  422 => 112,  419 => 111,  416 => 110,  413 => 109,  411 => 108,  408 => 107,  405 => 106,  402 => 105,  399 => 104,  393 => 103,  378 => 101,  375 => 100,  369 => 97,  365 => 96,  361 => 95,  354 => 94,  351 => 93,  348 => 92,  345 => 91,  342 => 90,  336 => 89,  320 => 86,  314 => 84,  311 => 83,  308 => 82,  306 => 81,  301 => 79,  295 => 78,  288 => 77,  270 => 76,  265 => 75,  263 => 74,  260 => 73,  257 => 72,  254 => 71,  252 => 70,  249 => 69,  246 => 68,  244 => 67,  241 => 66,  238 => 65,  221 => 64,  218 => 63,  215 => 62,  210 => 61,  207 => 60,  201 => 59,  185 => 56,  179 => 54,  177 => 53,  172 => 51,  166 => 50,  159 => 49,  141 => 48,  136 => 47,  133 => 46,  116 => 45,  110 => 41,  104 => 38,  99 => 35,  97 => 34,  92 => 32,  84 => 27,  76 => 22,  64 => 12,  62 => 11,  50 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/bundles/pimcoreadmin/css/object_versions.css\"/>
</head>

<body>


{% set fields = object.getClass().getFieldDefinitions()  %}

<table class=\"preview\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">
    <tr>
        <th>Name</th>
        <th>Key</th>
        <th>Value</th>
    </tr>
    <tr class=\"system\">
        <td>Date</td>
        <td>modificationDate</td>
        <td>{{ object.getModificationDate()|date('Y-m-d H:i:s') }}</td>
    </tr>
    <tr class=\"system\">
        <td>Path</td>
        <td>path</td>
        <td>{{ object.getRealFullPath() }}</td>
    </tr>
    <tr class=\"system\">
        <td>Published</td>
        <td>published</td>
        <td>{{ object.getPublished() ? 'true' : 'false' }}</td>
    </tr>
    {% if versionNote %}
        <tr class=\"system\">
            <td>Version Note</td>
            <td>&nbsp;</td>
            <td>{{ versionNote|nl2br }}</td>
        </tr>
    {% endif %}

    <tr class=\"\">
        <td colspan=\"3\">&nbsp;</td>
    </tr>
    {% for fieldName, definition in fields %}
        {% if definition is instanceof('\\\\Pimcore\\\\Model\\\\DataObject\\\\ClassDefinition\\\\Data\\\\Localizedfields') %}
            {% for language in validLanguages %}
                {% for lfd in definition.getFieldDefinitions() %}
                    <tr {% if loop.index is odd %}class=\"odd\"{% endif %}>
                        <td>{{ lfd.getTitle()|trans([],'admin') }} ({{ language }})</td>
                        <td>{{ lfd.getName() }}</td>
                        <td>
                                {% if object.getValueForFieldName(fieldName) %}
                                    {{ lfd.getVersionPreview(object.getValueForFieldName(fieldName).getLocalizedValue(lfd.getName(), language)) | raw }}
                                {% endif %}
                        </td>
                    </tr>
                {% endfor %}
            {% endfor %}
        {% elseif definition is instanceof('\\\\Pimcore\\\\Model\\\\DataObject\\\\ClassDefinition\\\\Data\\\\Objectbricks') %}
            {% for asAllowedType in definition.getAllowedTypes() %}
                {% set collectionDef = pimcore_object_brick_definition_key(asAllowedType) %}

                {% for lfd in collectionDef.getFieldDefinitions() %}
                    {% set value = null %}

                    {% set fieldGetter = \"get\" ~ (fieldName|capitalize) %}
                    {% set brick = attribute(object, fieldGetter) %}

                    {% if brick is not empty %}
                        {% set allowedMethod = \"get\" ~ asAllowedType %}
                        {% set brickValue = attribute(brick,allowedMethod) %}

                        {% if lfd is instanceof('\\\\Pimcore\\\\Model\\\\DataObject\\\\ClassDefinition\\\\Data\\\\Localizedfields') %}
                            {% for language in validLanguages %}
                                {% for localizedFieldDefinition in lfd.getFieldDefinitions() %}
                                    <tr {% if loop.index is odd %}class=\"odd\"{% endif %}>
                                        <td>{{ localizedFieldDefinition.getTitle()|trans([],'admin') }} ({{ language }})</td>
                                        <td>{{ localizedFieldDefinition.getName() }}</td>
                                        <td>
                                            {% if brickValue %}
                                                {% set localizedBrickValues = brickValue.getLocalizedFields() %}
                                                {% set localizedBrickValue = localizedBrickValues.getLocalizedValue(localizedFieldDefinition.getName(), language) %}
                                                {{ localizedFieldDefinition.getVersionPreview(localizedBrickValue) | raw }}
                                            {% endif %}
                                        </td>
                                    </tr>
                                {% endfor %}
                            {% endfor %}
                        {% else %}
                            {% if brickValue %}
                                {% set value = lfd.getVersionPreview(brickValue.getValueForFieldName(lfd.getName())) %}
                            {% endif %}
                            <tr {% if loop.index is odd %}class=\"odd\"{% endif %}>
                                <td>{{ asAllowedType|capitalize ~ \" - \" ~ lfd.getTitle()|trans([],'admin')  }}</td>
                                <td>{{ lfd.getName() }}</td>
                                <td>{{ value | raw }}</td>
                            </tr>
                        {% endif %}
                    {% endif %}

                {% endfor %}
            {% endfor %}
        {% elseif definition is instanceof('\\\\Pimcore\\\\Model\\\\DataObject\\\\ClassDefinition\\\\Data\\\\Classificationstore') %}
            {% set storedata = object.getValueForFieldName(fieldName) %}
            {% set activeGroups = [] %}

            {% if storedata %}
                {% set activeGroups = storedata.getActiveGroups() %}
            {% endif %}
            {% if activeGroups is not empty %}
                {% set languages = ['default'] %}
                {% if definition.isLocalized() %}
                    {% set languages = validLanguages|merge(languages) %}
                {% endif %}

                {% for activeGroupId, enabled in activeGroups|filter((enabled, activeGroupId) => activeGroups[activeGroupId] is not empty) %}
                    {% set groupDefinition = pimcore_object_classificationstore_group(activeGroupId) %}
                    {% if groupDefinition is not empty %}
                        {% set keyGroupRelations = groupDefinition.getRelations() %}

                        {% for keyGroupRelation in keyGroupRelations %}
                            {% set keyDef = pimcore_object_classificationstore_get_field_definition_from_json(keyGroupRelation.getDefinition(), keyGroupRelation.getType())  %}

                            {% if keyDef is not empty %}
                                {% for language in languages %}
                                    {% set keyData = storedata ? storedata.getLocalizedKeyValue(activeGroupId, keyGroupRelation.getKeyId(), language, true, true) : null %}

                                    {% set preview = keyDef.getVersionPreview(keyData) %}
                                    <tr {% if loop.index is odd %}class=\"odd\"{% endif %}>
                                        <td>{{ definition.getTitle()|trans([],'admin') }}</td>
                                        <td>{{ groupDefinition.getName() ~ \"-\" ~ keyGroupRelation.getName() }} {{ definition.isLocalized() ? \"/ \" ~ language : \"\"  }}</td>
                                        {% if isImportPreview is not defined or isNew is not defined %}
                                            <td>{{ preview | raw }}</td>
                                        {% endif %}
                                    </tr>
                                {% endfor %}
                            {% endif %}
                        {% endfor %}
                    {% endif %}
                {% endfor %}
            {% endif %}
        {% elseif definition is instanceof('\\\\Pimcore\\\\Model\\\\DataObject\\\\ClassDefinition\\\\Data\\\\Fieldcollections') %}
            {% set fields = object.get(fieldName) %}
            {% set fieldDefinitions = null %}
            {% set fieldItems = null %}

            {% if fields %}
                {% set fieldDefinitions = fields.getItemDefinitions() %}
                {% set fieldItems = fields.getItems() %}
            {% endif %}

            {% if fieldItems is iterable and fieldItems|length > 0 %}
                {% for fkey,fieldItem  in fieldItems %}
                    {% set fieldKeys = fieldDefinitions[fieldItem.getType()].getFieldDefinitions() %}
                    {% for fieldKey in fieldKeys %}
                        {% if fieldKey is instanceof('\\\\Pimcore\\\\Model\\\\DataObject\\\\ClassDefinition\\\\Data\\\\Localizedfields') %}
                            {% for language in validLanguages %}
                                {% for lfd in fieldKey.getFieldDefinitions() %}
                                    <tr {% if loop.index is odd %}class=\"odd\"{% endif %}>
                                        <td>{{ lfd.getTitle()|trans([],'admin') }} ({{ language }})</td>
                                        <td>{{ fieldItem.fieldName }} - {{ lfd.getName() }}/{{ language }}</td>
                                        <td>{{ lfd.getVersionPreview(fieldItem.Localizedfields.getLocalizedValue(lfd.getName(), language)) | raw }}</td>
                                    </tr>
                                {% endfor %}
                            {% endfor %}
                        {% else %}
                            {% set value = fieldItem.get(fieldKey.getName()) %}
                            <tr {% if loop.index is odd %}class=\"odd\"{% endif %}>
                                <td>{{ fieldItem.getType() ~ \" - \" ~ fieldKey.getTitle()|trans([],'admin') }}</td>
                                <td>{{ fieldKey.getName() }}</td>
                                <td>{{ fieldKey.getVersionPreview(value) | raw }}</td>
                            </tr>
                        {% endif %}
                    {% endfor %}
                {% endfor %}
            {% endif %}
        {% else %}
            <tr {% if loop.index is odd %}class=\"odd\"{% endif %}>
                <td>{{ definition.getTitle()|trans([],'admin') }}</td>
                <td>{{ definition.getName() }}</td>
                <td>{{ definition.getVersionPreview(object.getValueForFieldName(fieldName)) | raw }}</td>
            </tr>
        {% endif %}
    {% endfor %}
</table>
</body>
</html>
", "@PimcoreAdmin/admin/data_object/data_object/preview_version.html.twig", "/var/www/pimcore/vendor/pimcore/admin-ui-classic-bundle/templates/admin/data_object/data_object/preview_version.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 11, "if" => 34, "for" => 45];
        static $filters = ["escape" => 22, "date" => 22, "nl2br" => 38, "trans" => 50, "raw" => 54, "capitalize" => 67, "merge" => 114, "filter" => 117, "length" => 153];
        static $functions = ["pimcore_object_brick_definition_key" => 62, "pimcore_object_classificationstore_group" => 118, "pimcore_object_classificationstore_get_field_definition_from_json" => 123];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'for'],
                ['escape', 'date', 'nl2br', 'trans', 'raw', 'capitalize', 'merge', 'filter', 'length'],
                ['pimcore_object_brick_definition_key', 'pimcore_object_classificationstore_group', 'pimcore_object_classificationstore_get_field_definition_from_json'],
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
