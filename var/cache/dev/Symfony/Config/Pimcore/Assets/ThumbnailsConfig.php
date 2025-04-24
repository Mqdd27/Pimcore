<?php

namespace Symfony\Config\Pimcore\Assets;

use Symfony\Component\Config\Loader\ParamConfigurator;
use Symfony\Component\Config\Definition\Exception\InvalidConfigurationException;

/**
 * This class is automatically generated to help in creating a config.
 */
class ThumbnailsConfig 
{
    private $allowedFormats;
    private $maxScalingFactor;
    private $_usedProperties = [];

    /**
     * @param ParamConfigurator|list<ParamConfigurator|mixed> $value
     *
     * @return $this
     */
    public function allowedFormats(ParamConfigurator|array $value): static
    {
        $this->_usedProperties['allowedFormats'] = true;
        $this->allowedFormats = $value;

        return $this;
    }

    /**
     * @default 5.0
     * @param ParamConfigurator|float $value
     * @return $this
     */
    public function maxScalingFactor($value): static
    {
        $this->_usedProperties['maxScalingFactor'] = true;
        $this->maxScalingFactor = $value;

        return $this;
    }

    public function __construct(array $value = [])
    {
        if (array_key_exists('allowed_formats', $value)) {
            $this->_usedProperties['allowedFormats'] = true;
            $this->allowedFormats = $value['allowed_formats'];
            unset($value['allowed_formats']);
        }

        if (array_key_exists('max_scaling_factor', $value)) {
            $this->_usedProperties['maxScalingFactor'] = true;
            $this->maxScalingFactor = $value['max_scaling_factor'];
            unset($value['max_scaling_factor']);
        }

        if ([] !== $value) {
            throw new InvalidConfigurationException(sprintf('The following keys are not supported by "%s": ', __CLASS__).implode(', ', array_keys($value)));
        }
    }

    public function toArray(): array
    {
        $output = [];
        if (isset($this->_usedProperties['allowedFormats'])) {
            $output['allowed_formats'] = $this->allowedFormats;
        }
        if (isset($this->_usedProperties['maxScalingFactor'])) {
            $output['max_scaling_factor'] = $this->maxScalingFactor;
        }

        return $output;
    }

}
