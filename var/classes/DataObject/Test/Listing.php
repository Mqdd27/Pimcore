<?php

namespace Pimcore\Model\DataObject\Test;

use Pimcore\Model;
use Pimcore\Model\DataObject;

/**
 * @method DataObject\Test|false current()
 * @method DataObject\Test[] load()
 * @method DataObject\Test[] getData()
 * @method DataObject\Test[] getObjects()
 */

class Listing extends DataObject\Listing\Concrete
{
protected $classId = "test";
protected $className = "test";


/**
* Filter by textInput (Text Input)
* @param string|int|float|array|Model\Element\ElementInterface $data  comparison data, can be scalar or array (if operator is e.g. "IN (?)")
* @param string $operator  SQL comparison operator, e.g. =, <, >= etc. You can use "?" as placeholder, e.g. "IN (?)"
* @return $this
*/
public function filterByTextInput ($data, $operator = '='): static
{
	$this->getClass()->getFieldDefinition("textInput")->addListingFilter($this, $data, $operator);
	return $this;
}

/**
* Filter by check (Check)
* @param string|int|float|array|Model\Element\ElementInterface $data  comparison data, can be scalar or array (if operator is e.g. "IN (?)")
* @param string $operator  SQL comparison operator, e.g. =, <, >= etc. You can use "?" as placeholder, e.g. "IN (?)"
* @return $this
*/
public function filterByCheck ($data, $operator = '='): static
{
	$this->getClass()->getFieldDefinition("check")->addListingFilter($this, $data, $operator);
	return $this;
}

/**
* Filter by user (User)
* @param mixed $data
* @param string $operator SQL comparison operator, e.g. =, <, >= etc. You can use "?" as placeholder, e.g. "IN (?)"
* @return $this
*/
public function filterByUser ($data, $operator = '='): static
{
	$this->getClass()->getFieldDefinition("user")->addListingFilter($this, $data, $operator);
	return $this;
}



}
