<?php

namespace App\Controller;

use Pimcore\Controller\FrontendController;

class CustomController extends FrontendController
{
    public function portalAction()
    {
        return $this->render('custom/portal.html.twig');
    }
}
