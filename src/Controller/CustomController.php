<?php

namespace App\Controller;

use Pimcore\Controller\FrontendController;

class CustomController extends FrontendController
{
    public function portalAction()
    {
        return $this->render('layouts/custom/portal.html.twig');
    }
}
