import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ApiService } from '../services/api.service';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-newsletter';
import * as _ from 'lodash';
import { NgToastService } from 'ng-angular-popup';
declare var $: any;
// import CKEDITOR from 'grapesjs-plugin-ckeditor'

@Component({
  selector: 'app-vendor-new-campaigns',
  templateUrl: './vendor-new-campaigns.component.html',
  styleUrls: ['./vendor-new-campaigns.component.css']
})
export class VendorNewCampaignsComponent implements OnInit {
  name = 'Angular 6';
  user_id!: any;      
  camp_key!: any;      
  allDetails!: any;      
  vareEditor!: any;      
  recipientsArray!: any;      
  subject!: any;      
  preview_text!: any;
  email_design!: any;
  email_style!: any;
  upload_contact_list!: any;
  upload_contact_list_names!: any;
  subject_line_error!: any;
  recipantActive: any = 0;;
  excelError:boolean = false;  
  showRecTable:boolean = false;
  selectedRecipants:any = [];
  csvSelectedRecipants:any = [];
  btnDis!: any;
  errorMsg!: any;
  errorMsg1!: any;
  renameCampaignsModal!: any;
  campDeleteAlertModal!: any;
  camp_name!: any;
  htmlContent!: any;
  csvModalButton!: any;
  allCustDetails!: any;
  recipantsTypeArray = [
    {id:1, name: 'All Customers', mainKey: 'all'},
    {id:2, name: 'Ordered', mainKey: 'ordered'},
    {id:3, name: 'Contacted', mainKey: 'contacted'},
    {id:5, name: 'Unused credit', mainKey: 'unused-credit'},
    {id:6, name: 'Not yet ordered', mainKey: 'not-yet-ordered'},
    {id:7, name: 'Uncontacted', mainKey: 'uncontacted'},
    {id:8, name: 'Not signed up', mainKey: 'not-signed-up'},
    {id:9, name: 'On Bazar', mainKey: 'on-bazar'},
    // {id:10, name: 'Manual', mainKey: 'manual'},
  ]    
    
  constructor(public modalService: NgbModal, private apiService: ApiService, private storage: StorageMap,private router: Router, private activatedRoute: ActivatedRoute, private toast: NgToastService) { }

  ngOnInit() {
    let editor = grapesjs.init({
      // email-builder
      container: '#gjs-new',
      plugins: ['gjs-preset-newsletter', 'gjs-plugin-ckeditor'],
      pluginsOpts: {
        'gjs-preset-newsletter': {
          modalTitleImport: 'Import template'
        },
        'gjs-plugin-ckeditor' : {
          options: {
                  language: 'en',
                  position: 'top',
                  toolbarGroups: [
                    { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                    { name: 'forms', groups: [ 'forms' ] },
                    '/',
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                    { name: 'links', groups: [ 'links' ] },
                    { name: 'insert', groups: [ 'insert' ] },
                    '/',
                    { name: 'styles', groups: [ 'styles' ] },
                    { name: 'colors', groups: [ 'colors' ] },
                    { name: 'tools', groups: [ 'tools' ] },
                    { name: 'others', groups: [ 'others' ] },
                    { name: 'about', groups: [ 'about' ] }
                  ],
                  removeButtons: 'NewPage',
                },
        }
      
      },
      panels: false,
      storageManager: false
    });

    editor.setComponents('<body><img src="assets/images/email-builder-logo.svg" alt="img" id="il5d"/><div class="spacing-class"> </div><div class="spacing-class"> </div><h2 id="ik56">[Make an Announcement]</h2><p id="ix5f">We&#039;re thrilled to share our new products with you - and Net 60 payment terms!</p><img src="assets/images/local-brands-image-min.png" alt="img" id="ik1hz"/><div class="spacing-class"> </div><p id="iucal">[Tell your retailers about the new products that you added to your shop. Give them the backstory of your new line, any details on the products, and perhaps even recommend items that work well together]</p><p id="ig25j">We are now partnering with Bazar, the online wholesale marketplace, so that you can try our new products with Net 60 terms and free returns on your first order!</p><p id="im86g">Plus, we won&#039;t be charged commission on any of your orders since you&#039;re an existing stockist of ours.</p><p id="ij9wf">If you&#039;re new to Bazar, you will also receive $100* in credit and a year of free shipping on My Amarant covered by Bazar.</p><p id="i9lop">[Tell your retailers about the new products that you added to your shop. Give them the backstory of your new line, any details on the products, and perhaps even recommend items that work well together]</p><p id="i2zp6">We think you&#039;ll enjoy the experience so much that you&#039;ll want to shop with us on Bazar again!</p><div id="iv3kx"><a id="i7g31" href="">Shop</a></div><p id="ivdb7">Thanks,<br/>Best Seller</p><p id="ixecj">*€300 off for all European retailers, £300 for U.K. retailers, $100 for U.S. and Canadian retailers. Credit is only available to retailers new to Faire.</p></body>')
    editor.setStyle('* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}#il5d{height:auto;max-height:90px;max-width:90px;clear:both;margin:1em auto 0 auto;display:block;}#ik56{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:24px;font-weight:Bold;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ix5f{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ik1hz{max-width:100%;display:block;margin:0 auto 0 auto;}#iucal{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ig25j{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#im86g{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ij9wf{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#i9lop{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#i2zp6{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#iv3kx{margin:0 0 1em 0;padding:0;text-align:center;width:100%;}#i7g31{background:#393939;border:1px solid #393939;border-radius:3px;color:#fff;display:inline-block;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:41px;padding:0 100px 0 100px;text-align:center;}#ivdb7{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ixecj{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}')
    this.vareEditor = editor;

    // email-builder
    const bm = editor.Blocks; 

    //Step 1
    const blockTempleteOne = bm.add('templeteOne', {
      // Your block properties...
      label: 'Big announcement',
      category: 'Step 1 - Select a template',
      // attributes: { class: 'gjs-fonts gjs-f-image gjs-block gjs-one-bg gjs-four-color-h'},
      media: "<img src='assets/images/email-builder-big-announcement-icon.svg' alt=''>",
      content: '<img src="assets/images/email-builder-logo.svg"alt="img"style="height: auto; max-height: 90px; max-width: 90px; clear: both; margin: 1em auto 0 auto; display: block;"/><div class="spacing-class">&nbsp;</div><div class="spacing-class">&nbsp;</div><h2 style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: Bold; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">[Make an Announcement]</h2><p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">We&#039;re thrilled to share our new products with you - and Net 60 payment terms!</p><img src="assets/images/local-brands-image-min.png"alt="img" style="max-width: 100%; display: block; margin: 0 auto 0 auto;"/><div class="spacing-class">&nbsp;</div><p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">[Tell your retailers about the new products that you added to your shop. Give them the backstory of your new line, any details on the products, and perhaps even recommend items that work well together]</p><p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">We are now partnering with Bazar, the online wholesale marketplace, so that you can try our new products with Net 60 terms and free returns on your first order!</p><p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">Plus, we won&#039;t be charged commission on any of your orders since you&#039;re an existing stockist of ours.</p><p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">If you&#039;re new to Bazar, you will also receive $100* in credit and a year of free shipping on My Amarant covered by Bazar.</p><p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">[Tell your retailers about the new products that you added to your shop. Give them the backstory of your new line, any details on the products, and perhaps even recommend items that work well together]</p><p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">We think you&#039;ll enjoy the experience so much that you&#039;ll want to shop with us on Bazar again!</p><div style="margin:0 0 1em 0; padding: 0;text-align: center; width: 100%;"><a style="background: #393939; border: 1px solid #393939; border-radius: 3px; color: #fff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 41px; padding: 0 100px 0 100px; text-align: center;">Shop</a></div><p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">Thanks,<br/>Best Seller</p><p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">*€300 off for all European retailers, £300 for U.K. retailers, $100 for U.S. and Canadian retailers. Credit is only available to retailers new to Faire.</p>',
      attributes: { class: 'templeteOne' }
    });

    //Step 2
    const block = bm.add('header', {
      // Your block properties...
      label: 'Header',
      category: 'Step 2 - Customize your email',
      // attributes: { class: 'gjs-fonts gjs-f-image gjs-block gjs-one-bg gjs-four-color-h'},
      media: "<img src='assets/images/email-builder-header-icon.svg' alt=''>",
      content: '<h2 style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: Bold; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">[Make an Announcement]</h2>',
      attributes: { class: 'header' }
    });

    const blockSpacing  = bm.add('spacing',{ 
      label: 'Spacing',
      category: 'Step 2 - Customize your email',
      media: "<img src='assets/images/email-builder-text-icon.svg' alt=''>",
      content: "<div class='spacing-class'>&nbsp;</div>",
      attributes: { id: 'test' }
     })

    const blockbutton  = bm.add('buttonId',{
      label: 'Button',
      category: 'Step 2 - Customize your email',
      media: "<img src='assets/images/email-builder-button.svg' alt=''>",
      content: `<div style="text-align: center; width: 100%;"><a href="" style="background: #393939; border: 1px solid #393939; border-radius: 3px; color: #fff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 41px; padding: 0 100px 0 100px; text-align: center;">Shop</a></div>`,
      attributes: {
        class: 'button',
      },
    })

    const blockparagraph  = bm.add('paragraph',{ 
      label: 'Text',
      category: 'Step 2 - Customize your email',
      media: "<img src='assets/images/email-builder-text-icon.svg' alt=''>",
      content: '<p style="color: #000; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; line-height: 21px; margin:0 0 1em 0; padding: 0 0.9375em 0 0.9375em;">[Tell your retailers about the new products that you added to your shop. Give them the backstory of your new line, any details on the products, and perhaps even recommend items that work well together]</p>',
      attributes: {
        class: 'paragraph',   
      },
    })

    const blockLogo = bm.add('LOGO', {
      label: 'Logo',
      category: 'Step 2 - Customize your email',
      attributes:  {
        class: 'logoimg'
      },
      media: "<img src='assets/images/email-builder-logo-icon.svg' alt=''>",
      content: { 
        type: 'image' , 
        activeOnRender: true,
        style : {
        'height': 'auto',
        'max-height': '90px',
        'max-width': '90px',
        'clear': 'both',
        'margin': '1em auto 0 auto',
        'display': 'block',
        } 
      },
      select: true,
      activate: true,
    });

    const blocks = editor.BlockManager.getAll();
    // document.getElementById('some-id')
    editor.Blocks.get('divider').set({  
      category: 'Step 2 - Customize your email',
      media: "<img src='assets/images/email-builder-divider.svg' alt=''>",
      attributes: {
        class: 'divider'
      }
     })

     editor.Blocks.get('image').set({ 
      category: 'Step 2 - Customize your email',
      content: { 
        type: 'image' , 
        activeOnRender: true,
        style : {
        'max-width': '100%',
        'display': 'block',
        'margin': '0 auto 0 auto',
        } 
      },
     })

     editor.Blocks.get('image').set({ 
      media: "<img src='assets/images/email-builder-image-icon.svg' alt=''>",
      attributes: {
        class: 'image'
      }
     })

    editor.BlockManager.getAll().remove('text');
    editor.BlockManager.getAll().remove('sect100');
    editor.BlockManager.getAll().remove('sect50');
    editor.BlockManager.getAll().remove('sect30');
    editor.BlockManager.getAll().remove('sect37');
    editor.BlockManager.getAll().remove('text-sect');
    editor.BlockManager.getAll().remove('quote');
    editor.BlockManager.getAll().remove('button');
    editor.BlockManager.getAll().remove('link');
    editor.BlockManager.getAll().remove('link-block');
    editor.BlockManager.getAll().remove('list-items');
    editor.BlockManager.getAll().remove('grid-items');

    const rte = editor.RichTextEditor;

    rte.add('leftalign', {
      icon: '<b>L</b>',
      attributes: {title: 'LeftAlign', class: 'leftAlign'},
      result: (rte: any) => rte.insertHTML(`<div style="text-align: left;">${rte.selection()}</div>`)
    });
    rte.add('centeralign', {
      icon: '<b>C</b>',
      attributes: {title: 'CenterAlign', class: 'centerAlign'},
      result: (rte: any) => rte.insertHTML(`<div style="text-align: center;">${rte.selection()}</div>`)
    });

    const isValidAnchor = (rte: any) => {
      // a utility function to help determine if the selected is a valid anchor node
      const anchor = rte.selection().anchorNode;
      const parentNode  = anchor && anchor.parentNode;
      const nextSibling = anchor && anchor.nextSibling;
      return (parentNode && parentNode.nodeName == 'A') || (nextSibling && nextSibling.nodeName == 'A')
    }

    rte.remove('strikethrough');
    rte.remove('wrap');
    rte.remove('link');

    editor.on('component:selected', function(model) {
      model.initToolbar();
    }); 

    editor.Panels.removeButton("views", "tablet");

    const categories: any = editor.BlockManager.getCategories();
    categories.each((category: any, key: any) => {
      if(key > 0) {
        category.set('open', false).on('change:open', (opened: any) => {
          opened.get('open') && categories.each((category: any) => {
                  category !== opened && category.set('open', false)
              })
          })
      }
    })

    $(document).ready(() => {  
      $(".fa-desktop").addClass("active");
      $( ".fa-mobile" ).click(function() {
        $( ".fa-desktop" ).removeClass( "active" )
        $(".fa-mobile").addClass("active");
      });
      $( ".fa-desktop" ).click(function() {
        $(".fa-mobile").removeClass("active");
        $( ".fa-desktop" ).addClass( "active" )
      });
    });

    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.activatedRoute.params.subscribe((routeParams) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.camp_key = routeParams['id'];
          this.getCampaigns(this.camp_key);
          this.fetchCustomers();
        })
      },
      error: (error) => {
        /* Called if data is invalid */
      },
    });

  }

  getCampaigns(camp_key: any) {
    this.apiService.campaignsDetail(camp_key).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        this.camp_name = response.data.title;
        this.subject = response.data.subject;
        this.preview_text = response.data.preview_text;
        if(response.data.preview_text) {
          this.vareEditor.setComponents(response.data.email_design);
          this.vareEditor.setStyle(response.data.email_style);
        } else {
          this.vareEditor.setComponents('<body><img src="assets/images/email-builder-logo.svg" alt="img" id="il5d"/><div class="spacing-class"> </div><div class="spacing-class"> </div><h2 id="ik56">[Make an Announcement]</h2><p id="ix5f">We&#039;re thrilled to share our new products with you - and Net 60 payment terms!</p><img src="assets/images/local-brands-image-min.png" alt="img" id="ik1hz"/><div class="spacing-class"> </div><p id="iucal">[Tell your retailers about the new products that you added to your shop. Give them the backstory of your new line, any details on the products, and perhaps even recommend items that work well together]</p><p id="ig25j">We are now partnering with Bazar, the online wholesale marketplace, so that you can try our new products with Net 60 terms and free returns on your first order!</p><p id="im86g">Plus, we won&#039;t be charged commission on any of your orders since you&#039;re an existing stockist of ours.</p><p id="ij9wf">If you&#039;re new to Bazar, you will also receive $100* in credit and a year of free shipping on My Amarant covered by Bazar.</p><p id="i9lop">[Tell your retailers about the new products that you added to your shop. Give them the backstory of your new line, any details on the products, and perhaps even recommend items that work well together]</p><p id="i2zp6">We think you&#039;ll enjoy the experience so much that you&#039;ll want to shop with us on Bazar again!</p><div id="iv3kx"><a id="i7g31">Shop</a></div><p id="ivdb7">Thanks,<br/>Best Seller</p><p id="ixecj">*€300 off for all European retailers, £300 for U.K. retailers, $100 for U.S. and Canadian retailers. Credit is only available to retailers new to Faire.</p></body>')
          this.vareEditor.setStyle('* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}#il5d{height:auto;max-height:90px;max-width:90px;clear:both;margin:1em auto 0 auto;display:block;}#ik56{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:24px;font-weight:Bold;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ix5f{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ik1hz{max-width:100%;display:block;margin:0 auto 0 auto;}#iucal{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ig25j{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#im86g{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ij9wf{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#i9lop{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#i2zp6{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#iv3kx{margin:0 0 1em 0;padding:0;text-align:center;width:100%;}#i7g31{background:#393939;border:1px solid #393939;border-radius:3px;color:#fff;display:inline-block;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:41px;padding:0 100px 0 100px;text-align:center;}#ivdb7{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}#ixecj{color:#000;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:normal;line-height:21px;margin:0 0 1em 0;padding:0 0.9375em 0 0.9375em;}')
        }
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000})
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000})
    })
  }

  fetchCustomers() {
    this.apiService.fetchAllCustomers().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allCustDetails= response.data;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000})
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000})
    })
  }

  onAdd() {
    // console.log(this.vareEditor.getHtml());
    // console.log(this.vareEditor.getCss());

  }

  openCsvExport(content:any) {
    this.csvModalButton = this.modalService.open(content, { windowClass: 'addCsvCustomerInformation' });
  }
  
  successUploadCampaigns(content:any) {
    this.modalService.open(content, { windowClass: 'successCampaignsModal' });
  }

  onUploadContactList1(event: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if(event.target.files && event.target.files.length > 0) {
      for (var i = 0; i < event.target.files.length; i++) { 
        if(!_.includes(af, event.target.files[i].type)){
          this.excelError = true;
          setTimeout(() => {
            this.excelError = false;
          }, 3000);
        } else {
          this.upload_contact_list=event.target.files[0];
          this.upload_contact_list_names=event.target.files[0].name;
          this.selectedRecipants.push({id: 0, name:event.target.files[0].name, valus: []});
          // console.log(this.upload_contact_list, this.upload_contact_list_names);
        }
      }
    }
  }

  onUploadContactList(event: any) {
    this.btnDis = true;
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    
    if(event.target.files && event.target.files.length > 0) {
      for (var i = 0; i < event.target.files.length; i++) { 
        if(!_.includes(af, event.target.files[i].type)){
          this.excelError = true;
          setTimeout(() => {
            this.excelError = false;
          }, 3000);
        } else {
          const formData = new FormData();
          // formData.append("upload_contact_list", event.target.files[0]);
          this.upload_contact_list=event.target.files[0];
          this.upload_contact_list_names=event.target.files[0].name;
          this.selectedRecipants.push({id: event.target.value, name: event.target.files[0].name, value: [], mainKey: 'csv'});
          this.csvSelectedRecipants.push(event.target.files[0].name);
          this.apiService.uploadCsvCustomers(formData).subscribe((responseBody) => {
            let response= JSON.parse(JSON.stringify(responseBody));
            if(response.res == true) {
              this.toast.success({detail: response.msg, summary: '', duration: 4000});
              this.btnDis = false;
              this.csvModalButton.close();
            } else {
              this.toast.error({detail: response.msg, summary: '', duration: 4000})
            }
          },(error) => {
            this.btnDis = false;
            this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000})
          })
        }
      }
    }
  }
 
  saveCampaign() {
    // console.log(this.vareEditor.getHtml());
    // console.log(this.vareEditor.getCss());
    // return;
    this.btnDis = true;
    let array:any = [];
    this.selectedRecipants.forEach((element: any) => {
      array.push(element.mainKey);
    });

    let values = {
      campaign_key: this.camp_key,
      customers: array,
      csv_customers: this.csvSelectedRecipants,
      subject: this.subject,
      preview_text: this.preview_text,
      email_design: this.vareEditor.getHtml(),
      email_style: this.vareEditor.getCss()
    };
    // console.log(this.vareEditor.getHtml());
    // console.log(this.vareEditor.getCss());
    this.htmlContent = this.vareEditor.getHtml();
    if(this.subject == undefined || this.subject == null || this.subject == '') {
      this.subject_line_error = "Subject Line is required";
      this.toast.error({detail: "Subject Line is required", summary: '', duration: 4000})
      this.btnDis = false;
    } else {
      this.apiService.updateCampaigns(values).subscribe((responseBody) => {
        let response= JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.subject_line_error = "";
          // this.subject = undefined;
          this.toast.success({detail: response.msg, summary: '', duration: 4000});
          this.btnDis = false;
          this.router.navigateByUrl('/campaigns');
        } else {
          this.toast.error({detail: response.msg, summary: '', duration: 4000})
        }
      },(error) => {
        this.btnDis = false;
        this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000})
      })
    }
  }

  customContactList() { 
    $(".custom-contact-list").slideToggle();
  }

  close() { 
    $(".custom-contact-list").slideUp();
  }

  onSelectRecip(event: any, item: any) {
    let array: any = [];
    let values = [1,2,3,4];
    if(event?.target?.checked) {
      // this.selectedRecipants.push(event.target.value);
      this.selectedRecipants.push({id: event.target.value, name: item.name, value: values, mainKey: item.mainKey});
    } else {
      let index = this.selectedRecipants.findIndex((item: any) => item.name == event.target.value);
      this.selectedRecipants.splice(index,1);
      // this.selectedRecipants = this.selectedRecipants.filter((item: any) => item !== event.target.value);
    }
    // console.log(this.selectedRecipants);
    // console.log(array);
  }

  onRemoveRecip(value:any) {
    this.selectedRecipants = this.selectedRecipants.filter((item: any, i:any) => item !== value);
    // console.log(this.selectedRecipants);
  }

  openRenameCampaigns(content:any) {
    this.renameCampaignsModal = this.modalService.open(content, { windowClass: 'createCampaignsModal' });
  }

  openCustDetAlertModal(content: any) {
    this.campDeleteAlertModal = this.modalService.open(content, { windowClass: 'custDetAlertModal' });
  }

  renameCampaign() {
    this.btnDis = true;
    let values= {
      title: this.camp_name,
      campaign_key: this.camp_key
    }
    if(this.camp_name == undefined || this.camp_name == null || this.camp_name == '') {
      this.errorMsg = "Please enter name";
    } else {
      this.apiService.renameCampaigns(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.toast.success({detail: response.msg, summary: '', duration: 4000});
          this.btnDis = false;
          this.getCampaigns(this.camp_key);
          this.renameCampaignsModal.close();
        } else {
          this.errorMsg = "";
          this.errorMsg1 = response.msg;
          this.btnDis = false;
          // this.toast.success({detail: response.msg, summary: '', duration: 4000});
        }
      },(error) => {
        this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000});
        this.btnDis = false;
      })

    }
  }

  deleteCampaign() {
    this.btnDis = true;
    this.apiService.deleteCampaigns(this.camp_key).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.subject_line_error = "";
        // this.subject = undefined;
        this.toast.success({detail: response.msg, summary: '', duration: 4000});
        this.btnDis = false;
        this.modalService.dismissAll();
        this.router.navigateByUrl('/campaigns');
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000})
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000})
    })
  }

}
