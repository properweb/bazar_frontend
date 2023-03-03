import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LocalBrandsComponent } from './local-brands/local-brands.component';
import { LocalManufacturersComponent } from './local-manufacturers/local-manufacturers.component';
import { InternationalBrandsComponent } from './international-brands/international-brands.component';
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
import { VendorBrandShopComponent } from './vendor-brand-shop/vendor-brand-shop.component';
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
import { ProductWordpressComponent } from './product-wordpress/product-wordpress.component';
import { VendorEditProductComponent } from './vendor-edit-product/vendor-edit-product.component';
import { VendorInventoryComponent } from './vendor-inventory/vendor-inventory.component';
import { VendorBulkProductsComponent } from './vendor-bulk-products/vendor-bulk-products.component';
import { SyncComponent } from './sync/sync.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AfterLoginHomeComponent } from './after-login-home/after-login-home.component';
import { AfterLoginLocalBrandsComponent } from './after-login-local-brands/after-login-local-brands.component';
import { AfterLoginLocalManufacturersComponent } from './after-login-local-manufacturers/after-login-local-manufacturers.component';
import { AfterLoginInternationalBrandsComponent } from './after-login-international-brands/after-login-international-brands.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { PendingChangesGuard } from './guards/pending-changes-guard.guard';
import { PrintPackingSlipComponent } from './print-packing-slip/print-packing-slip.component';
import { PickListComponent } from './pick-list/pick-list.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { UserBoardComponent } from './user-board/user-board.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { UserProductDetailsComponent } from './user-product-details/user-product-details.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    //redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'localBrands',
    component: LocalBrandsComponent
  },
  {
    path: 'localManufacturers',
    component: LocalManufacturersComponent
  },
  {
    path: 'internationalBrands',
    component: InternationalBrandsComponent
  },
  {
    path: 'userRegistration',
    component: UserRegistrationComponent
  },
  {
    path: 'vendorRegistration',
    component: VendorsRegistrationComponent
  },
  {
    path: 'vendorRegistration/:step_count',
    component: VendorsRegistrationComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'orders',
    component: UserMyOrdersComponent
  },
  {
    path: 'wishlist',
    component: UserWishlistComponent
  },
  {
    path: 'invoices',
    component: UserInvoiceComponent
  },
  {
    path: 'productCategory',
    component: ProductCategoryComponent
  },
  {
    path: 'productSubCategory',
    component: ProductSubCategoryComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'blogCategory',
    component: BlogCategoryComponent
  },
  {
    path: 'blogDetails',
    component: BlogDetailsComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'termsofUse',
    component: TermsOUseComponent
  },
  {
    path: 'brand/:id', 
    component: VendorBrandShopComponent
  },
  {
    path: 'brand-portal',
    component: VendorDashboardComponent
  },
  {
    path: 'products',
    component: VendorProductComponent
  },
  {
    path: 'shopify-import',
    component: ProductShopifyComponent
  },
  {
    path: 'wordpress-import',
    component: ProductWordpressComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'edit-product/:id',
    component: VendorEditProductComponent,
    canDeactivate: [PendingChangesGuard]
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent
  },
  {
    path: 'account-setting',
    component: AccountSeeing2Component
  },
  {
    path: 'arrange-items',
    component: ProductArrangementComponent
  },
  {
    path: 'my-shop',
    component: VendorMyShopComponent
  },
  {
    path: 'collections/new',
    component: VendorMyShopCollectionsComponent
  },
  {
    path: 'collections',
    component: VendorMyShopCollections1Component
  },
  {
    path: 'vendorMyShopVideos',
    component: VendorMyShopVideosComponent
  },
  {
    path: 'vendorMyShopVideos2',
    component: VendorMyShopVideos2Component
  },
  {
    path: 'my-shop/settings',
    component: VendorShopSettingsComponent
  },
  {
    path: 'brand-orders',
    component: VendorOrdersComponent
  },
  {
    path: 'inventory',
    component: VendorInventoryComponent
  },
  {
    path: 'brand-portal/invoices',
    component: VendorInvoicingComponent
  },
  {
    path: 'brand-portal/invoices/new',
    component: VendorCreateInvoiceComponent
  },
  {
    path: 'vendorOrderPayouts',
    component: VendorOrderPayoutsComponent
  },
  {
    path: 'vendorBazarDirect',
    component: VendorBazarDirectComponent
  },
  {
    path: 'vendorBazarDirect2',
    component: VendorBazarDirect2Component
  },
  {
    path: 'customers',
    component: VendorCustomersComponent
  },
  {
    path: 'vendorCustomers2',
    component: VendorCustomers2Component
  },
  {
    path: 'brand-portal/promotions',
    component: VendorPromotionsComponent
  },
  {
    path: 'brand-portal/promotions/new',
    component: VendorNewPromotionsComponent
  },
  {
    path: 'brand-portal/promotions/:id',
    component: VendorEditPromotionsComponent
  },
  {
    path: 'vendorPromotionsStatus',
    component: VendorPromotionsStatusComponent
  },
  {
    path: 'vendorAutomations',
    component: VendorAutomationsComponent
  },
  {
    path: 'vendorAutomations2',
    component: VendorAutomations2Component
  },
  {
    path: 'vendorAutomations3',
    component: VendorAutomations3Component
  },
  {
    path: 'vendorAutomations4',
    component: VendorAutomations4Component
  },
  {
    path: 'vendorAutomationsEdit',
    component: VendorAutomationsEditComponent
  },
  {
    path: 'brand-portal/marketing/campaigns',
    component: VendorCampaignsComponent
  },
  {
    path: 'brand-portal/marketing/campaigns/:id',
    component: VendorNewCampaignsComponent
  },
  {
    path: 'vendorEmailCampaigns',
    component: VendorEmailCampaignsComponent
  },
  {
    path: 'vendorPerformance',
    component: VendorPerformanceComponent
  },
  {
    path: 'vendorSellThrough',
    component: VendorSellThroughComponent
  },
  {
    path: 'vendorHome',
    component: VendorHomeComponent
  },
  {
    path: 'vendorPerformanceReviews',
    component: VendorPerformanceReviewsComponent
  },
  {
    path: 'bulk-products',
    component: VendorBulkProductsComponent
  },
  {
    path: 'sync',
    component: SyncComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'retailer-home',
    component: AfterLoginHomeComponent
  },
  {
    path: 'after-login-local-brands',
    component: AfterLoginLocalBrandsComponent
  },
  {
    path: 'after-login-local-manufacturers',
    component: AfterLoginLocalManufacturersComponent
  },
  {
    path: 'after-login-international-brands',
    component: AfterLoginInternationalBrandsComponent
  },
  {
    path: 'cart',
    component: ShoppingBagComponent
  },
  {
    path: 'print-packing-slip/:id',
    component: PrintPackingSlipComponent
  },
  {
    path: 'pick-list',
    component: PickListComponent
  },
  {
    path: 'verify-email/:token',
    component: VerifyEmailComponent
  },
  {
    path: 'checkout/:brand_id',
    component: CheckoutComponent
  },
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent
  },
  {
    path: 'edit-order/:id',
    component: EditOrderComponent
  },
  {
    path: 'view-order/:id',
    component: ViewOrderComponent
  },
  {
    path: 'chat',
    component: UserChatComponent
  },
  {
    path: 'boards/:id',
    component: UserBoardComponent
  },
  {
    path: 'brand-portal/customers/:id',
    component: CustomerDetailsComponent
  },
  {
    path: 'orders/:id',
    component: UserProductDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
