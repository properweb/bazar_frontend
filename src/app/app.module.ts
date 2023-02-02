import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LocalBrandsComponent } from './local-brands/local-brands.component';
import { LocalManufacturersComponent } from './local-manufacturers/local-manufacturers.component';
import { InternationalBrandsComponent } from './international-brands/international-brands.component';
import { UserLeftSidebarComponent } from './user-left-sidebar/user-left-sidebar.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { VendorsRegistrationComponent } from './vendors-registration/vendors-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMyOrdersComponent } from './user-my-orders/user-my-orders.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { UserInvoiceComponent } from './user-invoice/user-invoice.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductSubCategoryComponent } from './product-sub-category/product-sub-category.component';
import { BlogComponent } from './blog/blog.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { TermsOUseComponent } from './terms-o-use/terms-o-use.component';
import { VendorHeaderComponent } from './vendor-header/vendor-header.component';
import { VendorBrandShopComponent } from './vendor-brand-shop/vendor-brand-shop.component';
import { VendorDashboardHeaderComponent } from './vendor-dashboard-header/vendor-dashboard-header.component';
import { VendorSideMenuComponent } from './vendor-side-menu/vendor-side-menu.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorProductComponent } from './vendor-product/vendor-product.component';
import { ProductShopifyComponent } from './product-shopify/product-shopify.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountSeeing2Component } from './account-seeing2/account-seeing2.component';
import { ProductArrangementComponent } from './product-arrangement/product-arrangement.component';
import { VendorMyShopComponent } from './vendor-my-shop/vendor-my-shop.component';
import { VendorMyShopCollectionsComponent } from './vendor-my-shop-collections/vendor-my-shop-collections.component';
import { VendorMyShopCollections1Component } from './vendor-my-shop-collections1/vendor-my-shop-collections1.component';
import { VendorMyShopVideosComponent } from './vendor-my-shop-videos/vendor-my-shop-videos.component';
import { VendorMyShopVideos2Component } from './vendor-my-shop-videos2/vendor-my-shop-videos2.component';
import { VendorShopSettingsComponent } from './vendor-shop-settings/vendor-shop-settings.component';
import { VendorOrdersComponent } from './vendor-orders/vendor-orders.component';
import { VendorInvoicingComponent } from './vendor-invoicing/vendor-invoicing.component';
import { VendorCreateInvoiceComponent } from './vendor-create-invoice/vendor-create-invoice.component';
import { VendorOrderPayoutsComponent } from './vendor-order-payouts/vendor-order-payouts.component';
import { VendorBazarDirectComponent } from './vendor-bazar-direct/vendor-bazar-direct.component';
import { VendorBazarDirect2Component } from './vendor-bazar-direct2/vendor-bazar-direct2.component';
import { VendorCustomersComponent } from './vendor-customers/vendor-customers.component';
import { VendorCustomers2Component } from './vendor-customers2/vendor-customers2.component';
import { VendorPromotionsComponent } from './vendor-promotions/vendor-promotions.component';
import { VendorNewPromotionsComponent } from './vendor-new-promotions/vendor-new-promotions.component';
import { VendorEditPromotionsComponent } from './vendor-edit-promotions/vendor-edit-promotions.component';
import { VendorPromotionsStatusComponent } from './vendor-promotions-status/vendor-promotions-status.component';
import { VendorAutomationsComponent } from './vendor-automations/vendor-automations.component';
import { VendorAutomations2Component } from './vendor-automations2/vendor-automations2.component';
import { VendorAutomations3Component } from './vendor-automations3/vendor-automations3.component';
import { VendorAutomations4Component } from './vendor-automations4/vendor-automations4.component';
import { VendorAutomationsEditComponent } from './vendor-automations-edit/vendor-automations-edit.component';
import { VendorCampaignsComponent } from './vendor-campaigns/vendor-campaigns.component';
import { VendorNewCampaignsComponent } from './vendor-new-campaigns/vendor-new-campaigns.component';
import { VendorEmailCampaignsComponent } from './vendor-email-campaigns/vendor-email-campaigns.component';
import { VendorPerformanceComponent } from './vendor-performance/vendor-performance.component';
import { VendorSellThroughComponent } from './vendor-sell-through/vendor-sell-through.component';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { VendorPerformanceReviewsComponent } from './vendor-performance-reviews/vendor-performance-reviews.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductWordpressComponent } from './product-wordpress/product-wordpress.component';
import {  DragDropModule  } from '@angular/cdk/drag-drop';
import { TagInputModule } from 'ngx-chips';
import { VimeModule } from '@vime/angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { VendorEditProductComponent } from './vendor-edit-product/vendor-edit-product.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { VendorInventoryComponent } from './vendor-inventory/vendor-inventory.component';
import { VendorBulkProductsComponent } from './vendor-bulk-products/vendor-bulk-products.component';
import { BulkEditProductsComponent } from './bulk-edit-products/bulk-edit-products.component';
import { SyncComponent } from './sync/sync.component';
import { NgToastModule } from 'ng-angular-popup';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AfterLoginHeaderComponent } from './after-login-header/after-login-header.component';
import { AfterLoginLocalBrandsComponent } from './after-login-local-brands/after-login-local-brands.component';
import { AfterLoginHomeComponent } from './after-login-home/after-login-home.component';
import { AfterLoginLocalManufacturersComponent } from './after-login-local-manufacturers/after-login-local-manufacturers.component';
import { AfterLoginInternationalBrandsComponent } from './after-login-international-brands/after-login-international-brands.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { PendingChangesGuard } from './guards/pending-changes-guard.guard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { PickListComponent } from './pick-list/pick-list.component';
import { PrintPackingSlipComponent } from './print-packing-slip/print-packing-slip.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxPrintModule } from 'ngx-print';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApmModule } from '@elastic/apm-rum-angular';
import { VendorFaqComponent } from './vendor-faq/vendor-faq.component';
import { VendorMessageComponent } from './vendor-message/vendor-message.component'
import { NgChartjsModule } from 'ng-chartjs';
import { UserChatComponent } from './user-chat/user-chat.component';
import { UserBoardComponent } from './user-board/user-board.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { UserProductDetailsComponent } from './user-product-details/user-product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LocalBrandsComponent,
    FooterComponent,
    LocalManufacturersComponent,
    InternationalBrandsComponent,
    UserLeftSidebarComponent,
    UserRegistrationComponent,
    VendorsRegistrationComponent,
    UserProfileComponent,
    UserMyOrdersComponent,
    UserWishlistComponent,
    UserInvoiceComponent,
    ProductCategoryComponent,
    ProductSubCategoryComponent,
    BlogComponent,
    BlogCategoryComponent,
    BlogDetailsComponent,
    FaqComponent,
    AboutUsComponent,
    ContactComponent,
    TermsOUseComponent,
    VendorHeaderComponent,
    VendorBrandShopComponent,
    VendorDashboardHeaderComponent,
    VendorSideMenuComponent,
    VendorDashboardComponent,
    VendorProductComponent,
    ProductShopifyComponent,
    AddProductComponent,
    AccountSettingsComponent,
    AccountSeeing2Component,
    ProductArrangementComponent,
    VendorMyShopComponent,
    VendorMyShopCollectionsComponent,
    VendorMyShopCollections1Component,
    VendorMyShopVideosComponent,
    VendorMyShopVideos2Component,
    VendorShopSettingsComponent,
    VendorOrdersComponent,
    VendorInvoicingComponent,
    VendorCreateInvoiceComponent,
    VendorOrderPayoutsComponent,
    VendorBazarDirectComponent,
    VendorBazarDirect2Component,
    VendorCustomersComponent,
    VendorCustomers2Component,
    VendorPromotionsComponent,
    VendorNewPromotionsComponent,
    VendorEditPromotionsComponent,
    VendorPromotionsStatusComponent,
    VendorAutomationsComponent,
    VendorCampaignsComponent,
    VendorAutomations2Component,
    VendorAutomations3Component,
    VendorAutomations4Component,
    VendorAutomationsEditComponent,
    VendorNewCampaignsComponent,
    VendorEmailCampaignsComponent,
    VendorPerformanceComponent,
    VendorSellThroughComponent,
    VendorHomeComponent,
    VendorPerformanceReviewsComponent,
    ProductWordpressComponent,
    VendorEditProductComponent,
    VendorInventoryComponent,
    VendorBulkProductsComponent,
    BulkEditProductsComponent,
    SyncComponent,
    ProductDetailsComponent,
    AfterLoginHeaderComponent,
    AfterLoginLocalBrandsComponent,
    AfterLoginHomeComponent,
    AfterLoginLocalManufacturersComponent,
    AfterLoginInternationalBrandsComponent,
    ShoppingBagComponent,
    EditOrderComponent,
    PickListComponent,
    PrintPackingSlipComponent,
    ViewOrderComponent,
    VerifyEmailComponent,
    CheckoutComponent,
    ResetPasswordComponent,
    VendorFaqComponent,
    VendorMessageComponent,
    UserChatComponent,
    UserBoardComponent,
    CustomerDetailsComponent,
    UserProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    MatProgressSpinnerModule,
    Ng2SearchPipeModule,
    DragDropModule,
    TagInputModule,
    VimeModule,
    AutocompleteLibModule,
    ImageCropperModule,
    NgToastModule,
    SlickCarouselModule,
    CrystalLightboxModule,
    JwPaginationModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    NgxPaginationModule,
    NgxPrintModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ApmModule,
    NgChartjsModule
  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  providers: [
    PendingChangesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
