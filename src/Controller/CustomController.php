<?php

namespace App\Controller;

use Pimcore\Controller\FrontendController;

class CustomController extends FrontendController
{
    public function portalAction()
    {
        $this->render('layouts/custom/portal.html.twig');
    }
}
