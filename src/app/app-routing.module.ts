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
import { AuthGuard } from './guards/auth.guard';
import { VendorCustomerServiceComponent } from './vendor-customer-service/vendor-customer-service.component';
import { VendorOrderIssuesComponent } from './vendor-order-issues/vendor-order-issues.component';
import { VendorInvoiceDetailsComponent } from './vendor-invoice-details/vendor-invoice-details.component';
import { VendorMessageComponent } from './vendor-message/vendor-message.component';
import { SerachComponent } from './serach/serach.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { LargeWidgetComponent } from './large-widget/large-widget.component';
import { SmallWidgetComponent } from './small-widget/small-widget.component';
import { StandardWidgetComponent } from './standard-widget/standard-widget.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
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
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'orders',
    component: UserMyOrdersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'wishlist',
    component: UserWishlistComponent,
    canActivate: [AuthGuard], 
    data: { roles: ['retailer'] }
  },
  {
    path: 'invoices',
    component: UserInvoiceComponent,
    canActivate: [AuthGuard], 
    data: { roles: ['retailer'] }
  },
  {
    path: 'category/:cat_slug',
    component: ProductCategoryComponent
  },
  {
    path: 'category/:cat_slug/subcategory/:subcat_slug',
    component: ProductSubCategoryComponent
  },
  {
    path: 'category/:cat_slug/subcategory/:subcat_slug/:subsubcat_slug',
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
    component: VendorDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'products',
    component: VendorProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'shopify-import',
    component: ProductShopifyComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'wordpress-import',
    component: ProductWordpressComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'edit-product/:id',
    component: VendorEditProductComponent,
    canDeactivate: [PendingChangesGuard],
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'account-setting',
    component: AccountSeeing2Component,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'arrange-items',
    component: ProductArrangementComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'my-shop',
    component: VendorMyShopComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
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
    component: VendorShopSettingsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'brand-orders',
    component: VendorOrdersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'inventory',
    component: VendorInventoryComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'brand-invoices',
    component: VendorInvoicingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'brand-invoices/new',
    component: VendorCreateInvoiceComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'analytics/order-payout',
    component: VendorOrderPayoutsComponent
  },
  {
    path: 'direct',
    component: VendorBazarDirectComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'direct/widgets',
    component: VendorBazarDirect2Component,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'customers',
    component: VendorCustomersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'vendorCustomers2',
    component: VendorCustomers2Component,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'promotions',
    component: VendorPromotionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'promotions/new',
    component: VendorNewPromotionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'promotions/:id',
    component: VendorEditPromotionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'vendorPromotionsStatus',
    component: VendorPromotionsStatusComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'vendorAutomations',
    component: VendorAutomationsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'vendorAutomations2',
    component: VendorAutomations2Component,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'vendorAutomations3',
    component: VendorAutomations3Component,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'vendorAutomations4',
    component: VendorAutomations4Component,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'vendorAutomationsEdit',
    component: VendorAutomationsEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'campaigns',
    component: VendorCampaignsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'campaigns/:id',
    component: VendorNewCampaignsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'vendorEmailCampaigns',
    component: VendorEmailCampaignsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'analytics',
    component: VendorPerformanceComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'analytics/sell-through',
    component: VendorSellThroughComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'vendorHome',
    component: VendorHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'analytics/reviews',
    component: VendorPerformanceReviewsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'bulk-products',
    component: VendorBulkProductsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'sync',
    component: SyncComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand','retailer'] }
  },
  {
    path: 'retailer-home',
    component: AfterLoginHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'after-login-local-brands',
    component: AfterLoginLocalBrandsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'after-login-local-manufacturers',
    component: AfterLoginLocalManufacturersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'after-login-international-brands',
    component: AfterLoginInternationalBrandsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'cart',
    component: ShoppingBagComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
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
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent
  },
  {
    path: 'edit-order/:id',
    component: EditOrderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'view-order/:id',
    component: ViewOrderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'chat',
    component: UserChatComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'boards/:id',
    component: UserBoardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'orders/:id',
    component: UserProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['retailer'] }
  },
  {
    path: 'analytics/customer-service',
    component: VendorCustomerServiceComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'analytics/order-issues',
    component: VendorOrderIssuesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'brand-invoices/:id',
    component: VendorInvoiceDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'message',
    component: VendorMessageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['brand'] }
  },
  {
    path: 'search/:value',
    component: SerachComponent,
  },
  {
    path: 'print-invoice/:id',
    component: PrintInvoiceComponent
  },
  {
    path: 'embed/:key',
    component: LargeWidgetComponent,
  },
  {
    path: 'small-widget',
    component: SmallWidgetComponent,
  },
  {
    path: 'standard-widget',
    component: StandardWidgetComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
