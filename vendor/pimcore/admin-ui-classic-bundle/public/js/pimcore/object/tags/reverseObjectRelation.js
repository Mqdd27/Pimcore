/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.object.tags.reverseObjectRelation");
/**
 * @private
 */
pimcore.object.tags.reverseObjectRelation = Class.create(pimcore.object.tags.manyToManyObjectRelation, {

    pathProperty: "fullpath",

    getGridColumnConfig: function ($super, fieldConfig) {
        const gridColumnConfig = $super(fieldConfig);
        delete gridColumnConfig.getRelationFilter;
        return gridColumnConfig;
    },

    removeObject: function (index) {

        if (pimcore.globalmanager.exists("object_" + this.getStore().getAt(index).data.id) == false) {

            Ext.Ajax.request({
                url: Routing.generate('pimcore_admin_dataobject_dataobject_get'),
                async: false,
                params: {id: this.getStore().getAt(index).data.id},
                success: function(index, response) {
                    this.data = Ext.decode(response.responseText);
                    if (this.data.editlock) {
                        var lockDate = new Date(this.data.editlock.date * 1000);
                        var lockDetails = "<br /><br />";
                        lockDetails += "<b>" + t("user") + ":</b> " + this.data.editlock.user.name + "<br />";
                        lockDetails += "<b>" + t("since") + ": </b>" + Ext.util.Format.date(lockDate);
                        lockDetails += "<br /><br />" + t("element_implicit_edit_question");

                        Ext.MessageBox.confirm(t("element_is_locked"), t("element_lock_message") + lockDetails,
                                function (lock, buttonValue) {
                                    if (buttonValue == "yes") {
                                        this.getStore().removeAt(index);
                                    }
                                }.bind(this, arguments));

                    } else {
                        Ext.Ajax.request({
                            url: Routing.generate('pimcore_admin_element_lockelement'),
                            method: 'PUT',
                            params: {
                                id: this.getStore().getAt(index).data.id,
                                type: 'object'
                            }
                        });

                        this.getStore().removeAt(index);
                    }

                }.bind(this, index)
            });
        } else {

            var lockDetails = "<br /><br />" + t("element_implicit_edit_question");

            Ext.MessageBox.confirm(' ', t("element_open_message") + lockDetails,
                function (lock, buttonValue) {
                    if (buttonValue == "yes") {
                        this.getStore().removeAt(index);
                    }
                }.bind(this, arguments)
            );
        }

    },

    actionColumnRemove: function (grid, rowIndex) {
        var f = this.removeObject.bind(grid, rowIndex);
        f();
    },

    getLayoutEdit: function () {

        var autoHeight = false;
        if (!this.fieldConfig.height) {
            autoHeight = true;
        }

        var cls = this.getWrapperClassNames();

        var classStore = pimcore.globalmanager.get("object_types_store");
        var record = classStore.getAt(classStore.findExact('text', this.fieldConfig.ownerClassName));

        // no class for nonowner is specified
        if(!record) {
            this.component = new Ext.Panel({
                title: t(this.fieldConfig.title),
                cls: cls,
                html: "There's no class specified in the field-configuration"
            });

            return this.component;
        }


        var className = record.data.text;

        let columns = this.getVisibleColumns();

       this.component = new Ext.grid.GridPanel({
            store: this.store,
            border: true,
            style: "margin-bottom: 10px",
            cls: "pimcore_reverse-object-relation-panel",
            selModel: Ext.create('Ext.selection.RowModel', {}),
            columns: {
                defaults: {
                    sortable: false
                },
                items: [
                    ...columns,
                    ...[
                        {
                            xtype: 'actioncolumn',
                            menuText: t('open'),
                            width: 30,
                            items: [
                                {
                                    tooltip: t('open'),
                                    icon: "/bundles/pimcoreadmin/img/flat-color-icons/open_file.svg",
                                    handler: function (el, rowIndex) {
                                        var data = this.store.getAt(rowIndex);
                                        pimcore.helpers.openObject(data.data.id, "object");
                                    }.bind(this)
                                }
                            ]
                        },
                        {
                            xtype: 'actioncolumn',
                            menuText: t('remove'),
                            width: 30,
                            items: [
                                {
                                    tooltip: t('remove'),
                                    icon: "/bundles/pimcoreadmin/img/flat-color-icons/delete.svg",
                                    handler: this.actionColumnRemove.bind(this)
                                }
                            ]
                        }
                    ]
                ]
            },
            componentCls: cls,
            width: this.fieldConfig.width,
            height: this.fieldConfig.height,
            tbar: {
                items: this.getEditToolbarItems(),
                ctCls: "pimcore_force_auto_width",
                cls: "pimcore_force_auto_width",
            },
            bbar: {
                items: [
                    {
                        xtype: "tbtext",
                        text:
                            ' <div class="warning pimcore_reverse-object-relation-warning">' +
                            t("nonownerobject_warning") +
                            "<br>" +
                            t("owner_class") +
                            ": <b>" +
                            t(className) +
                            "</b> " +
                            t("owner_field") +
                            ": <b>" +
                            t(this.fieldConfig.ownerFieldName) +
                            "</b></div>",
                        height: "fit-content",
                    },
                ],
                ctCls: "pimcore_force_auto_width",
                cls: "pimcore_force_auto_width pimcore_reverse-object-relation-bottom-bar",
                height: "4.5rem",
            },
            autoHeight: autoHeight,
            bodyCssClass: "pimcore_object_tag_objects",
            viewConfig: {
                markDirty: false,
                listeners: {
                    afterrender: function (gridview) {
                        this.requestNicePathData(this.store.data, true);
                    }.bind(this)
                }
            },
            listeners: {
                rowdblclick: this.gridRowDblClickHandler,
            },
            plugins: [
                'gridfilters'
            ]
        });

        this.component.on("rowcontextmenu", this.onRowContextmenu);
        this.component.reference = this;

        this.component.on("afterrender", function () {

            var dropTargetEl = this.component.getEl();
            var gridDropTarget = new Ext.dd.DropZone(dropTargetEl, {
                ddGroup    : 'element',
                getTargetFromEvent: function(e) {
                    return this.component.getEl().dom;
                    //return e.getTarget(this.grid.getView().rowSelector);
                }.bind(this),
                onNodeOver: function (overHtmlNode, ddSource, e, data) {
                    try {
                        var record = data.records[0].data;
                        var fromTree = this.isFromTree(ddSource);
                        if (data.records.length === 1 && record.elementType === "object" && this.dndAllowed(record, fromTree)) {
                            return Ext.dd.DropZone.prototype.dropAllowed;
                        } else {
                            return Ext.dd.DropZone.prototype.dropNotAllowed;
                        }
                    } catch (e) {
                        console.log(e);
                    }

                }.bind(this),

                onNodeDrop : function(target, dd, e, data) {

                    if(!pimcore.helpers.dragAndDropValidateSingleItem(data)) {
                        return false;
                    }

                    try {
                        var record = data.records[0];
                        var data = record.data;
                        this.nodeElement = data;
                        var fromTree = this.isFromTree(dd);

                        if (data.elementType != "object") {
                            return false;
                        }

                        if (this.dndAllowed(data, fromTree)) {
                            var initData = {
                                id: data.id,
                                fullpath: data.path,
                                className: data.className,
                                published: data.published
                            };

                            if (!this.objectAlreadyExists(initData.id) && initData.id != this.object.id) {
                                this.addObject(initData);
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }.bind(this)
            });
        }.bind(this));


        return this.component;
    },


    dndAllowed: function(data, fromTree) {

        // check if data is a treenode, if not allow drop because of the reordering
        if (!fromTree) {
            return true;
        }

        // only allow objects not folders
        if (data.type == "folder") {
            return false;
        }

        //don't allow relation to myself
        if (data.id == this.object.id) {
            return false;
        }

        var classname = data.className;

        var classStore = pimcore.globalmanager.get("object_types_store");
        var record = classStore.getAt(classStore.findExact('text', classname));
        var name = record.data.text;

        if (this.fieldConfig.ownerClassName == name) {
            return true;
        } else {
            return false;
        }
    },

    openSearchEditor: function () {
        var allowedClasses = [];
        var classStore = pimcore.globalmanager.get("object_types_store");
        var record = classStore.getAt(classStore.findExact('text', this.fieldConfig.ownerClassName));
        allowedClasses.push(record.data.text);


        pimcore.helpers.itemselector(true, this.addDataFromSelector.bind(this),
            {
                type: ["object"],
                subtype: {
                    object: ["object", "variant"]
                },
                specific: {
                    classes: allowedClasses
                }
            },
            {
                context: Ext.apply({scope: "objectEditor"}, this.getContext())
            });
    },

    addObject: function(item) {

        if (pimcore.globalmanager.exists("object_" + item.id) == false) {

            Ext.Ajax.request({
                url: Routing.generate('pimcore_admin_dataobject_dataobject_get'),
                params: {id: item.id},
                success: function(item, response) {
                    this.data = Ext.decode(response.responseText);
                    if (this.data.editlock) {
                        var lockDate = new Date(this.data.editlock.date * 1000);
                        var lockDetails = "<br /><br />";
                        lockDetails += "<b>" + t("user") + ":</b> " + this.data.editlock.user.name + "<br />";
                        lockDetails += "<b>" + t("since") + ": </b>" + Ext.util.Format.date(lockDate);
                        lockDetails += "<br /><br />" + t("element_implicit_edit_question");

                        Ext.MessageBox.confirm(t("element_is_locked"), t("element_lock_message") + lockDetails,
                                function (lock, buttonValue) {
                                    if (buttonValue == "yes") {
                                        this.store.add(item);

                                        const toBeRequested = new Ext.util.Collection();
                                        toBeRequested.add(this.loadObjectData(item, this.visibleFields));
                                        this.requestNicePathData(toBeRequested, true);
                                    }
                                }.bind(this, arguments));

                    } else {
                        Ext.Ajax.request({
                            url: Routing.generate('pimcore_admin_element_lockelement'),
                            method: 'PUT',
                            params: {id: item.id, type: 'object'}
                        });

                        this.store.add(item);

                        const toBeRequested = new Ext.util.Collection();
                        toBeRequested.add(this.loadObjectData(item, this.visibleFields));
                        this.requestNicePathData(toBeRequested, true);
                    }

                }.bind(this, item)
            });
        } else {

            var lockDetails = "<br /><br />" + t("element_implicit_edit_question");

            Ext.MessageBox.confirm(' ', t("element_open_message") + lockDetails,
                function (item, buttonValue) {
                    if (buttonValue == "yes") {
                        this.store.add(item);

                        const toBeRequested = new Ext.util.Collection();
                        toBeRequested.add(this.loadObjectData(item, this.visibleFields));
                        this.requestNicePathData(toBeRequested, true);
                    }
                }.bind(this, item)
            );
        }
    },


    addDataFromSelector: function (items) {
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                if (this.object.id == item.id) {
                    //cannot select myself!
                    Ext.MessageBox.show({
                        title:t('error'),
                        msg: t('nonownerobjects_self_selection'),
                        buttons: Ext.Msg.OK ,
                        icon: Ext.MessageBox.ERROR
                    });

                } else if (!this.objectAlreadyExists(item.id)) {
                    this.addObject(item);
                }
            }
        }
    }

});

