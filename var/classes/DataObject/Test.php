<?php

/**
 * Inheritance: no
 * Variants: no
 *
 * Fields Summary:
 * - textInput [input]
 * - check [checkbox]
 * - user [manyToOneRelation]
 */

namespace Pimcore\Model\DataObject;

use Pimcore\Model\DataObject\Exception\InheritanceParentNotFoundException;
use Pimcore\Model\DataObject\PreGetValueHookInterface;

/**
* @method static \Pimcore\Model\DataObject\Test\Listing getList(array $config = [])
* @method static \Pimcore\Model\DataObject\Test\Listing|\Pimcore\Model\DataObject\Test|null getByTextInput(mixed $value, ?int $limit = null, int $offset = 0, ?array $objectTypes = null)
* @method static \Pimcore\Model\DataObject\Test\Listing|\Pimcore\Model\DataObject\Test|null getByCheck(mixed $value, ?int $limit = null, int $offset = 0, ?array $objectTypes = null)
* @method static \Pimcore\Model\DataObject\Test\Listing|\Pimcore\Model\DataObject\Test|null getByUser(mixed $value, ?int $limit = null, int $offset = 0, ?array $objectTypes = null)
*/

class Test extends Concrete
{
public const FIELD_TEXT_INPUT = 'textInput';
public const FIELD_CHECK = 'check';
public const FIELD_USER = 'user';

protected $classId = "test";
protected $className = "test";
protected $textInput;
protected $check;
protected $user;


/**
* @param array $values
* @return static
*/
public static function create(array $values = []): static
{
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get textInput - Text Input
* @return string|null
*/
public function getTextInput(): ?string
{
	if ($this instanceof PreGetValueHookInterface && !\Pimcore::inAdmin()) {
		$preValue = $this->preGetValue("textInput");
		if ($preValue !== null) {
			return $preValue;
		}
	}

	$data = $this->textInput;

	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}

	return $data;
}

/**
* Set textInput - Text Input
* @param string|null $textInput
* @return $this
*/
public function setTextInput(?string $textInput): static
{
	$this->markFieldDirty("textInput", true);

	$this->textInput = $textInput;

	return $this;
}

/**
* Get check - Check
* @return bool|null
*/
public function getCheck(): ?bool
{
	if ($this instanceof PreGetValueHookInterface && !\Pimcore::inAdmin()) {
		$preValue = $this->preGetValue("check");
		if ($preValue !== null) {
			return $preValue;
		}
	}

	$data = $this->check;

	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}

	return $data;
}

/**
* Set check - Check
* @param bool|null $check
* @return $this
*/
public function setCheck(?bool $check): static
{
	$this->markFieldDirty("check", true);

	$this->check = $check;

	return $this;
}

/**
* Get user - User
* @return \Pimcore\Model\DataObject\Test|null
*/
public function getUser(): ?\Pimcore\Model\Element\AbstractElement
{
	if ($this instanceof PreGetValueHookInterface && !\Pimcore::inAdmin()) {
		$preValue = $this->preGetValue("user");
		if ($preValue !== null) {
			return $preValue;
		}
	}

	$data = $this->getClass()->getFieldDefinition("user")->preGetData($this);

	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}

	return $data;
}

/**
* Set user - User
* @param \Pimcore\Model\DataObject\Test|null $user
* @return $this
*/
public function setUser(?\Pimcore\Model\Element\AbstractElement $user): static
{
	/** @var \Pimcore\Model\DataObject\ClassDefinition\Data\ManyToOneRelation $fd */
	$fd = $this->getClass()->getFieldDefinition("user");
	$hideUnpublished = \Pimcore\Model\DataObject\Concrete::getHideUnpublished();
	\Pimcore\Model\DataObject\Concrete::setHideUnpublished(false);
	$currentData = $this->getUser();
	\Pimcore\Model\DataObject\Concrete::setHideUnpublished($hideUnpublished);
	$isEqual = $fd->isEqual($currentData, $user);
	if (!$isEqual) {
		$this->markFieldDirty("user", true);
	}
	$this->user = $fd->preSetData($this, $user);
	return $this;
}

}

