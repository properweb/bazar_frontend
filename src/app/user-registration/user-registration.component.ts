import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  email !: any;
  first_name !: any;
  last_name !: any;
  password !: any;
  country !: any;
  country_code!: any;
  phone_number!: any;
  language!: any;
  sign_up_for_email!: any;
  store_type!: any;
  store_name!: any;
  website_url!: any;
  years_in_business!: any;
  annual_sales!: any;
  inst_cat!: any;
  describe_stores: any = [];
  tag_shop_page_about!: any ;
  validError!: any ;
  validErrorDesStore!: any ;
  validErrorCat!: any ;
  validErrorTag!: any ;
  btnDis!: any;
  errorMsg!: any;
  retailer_id: any = null;
  vendorCount: any = 0;

  countriesArray:any = [];
  tagsToolsArray:any = [];
  proCatArray:any = [];
  chekedStoreTypeArray: any = [];
  
  tagsArray:any =[
    { name: 'Eco-friendly', value: '1' },
    { name: 'Not on Amazon', value: '2' },
    { name: 'Made in Europe', value: '3' },
    { name: 'Social good', value: '4' },
    { name: 'Shop local', value: '5' },
    { name: 'Local brand', value: '6' },
  ];

  yearsInBussArray:any =[
    { name: 'Opening Soon', value: 'OPENING_SOON' },
    { name: 'Started in ' + new Date().getFullYear(), value: 'STARTED_THIS_YEAR' },
    { name: 'Started between ' + (new Date().getFullYear() - 5) + '-' + (new Date().getFullYear() - 1), value: 'BETWEEN_5_AND_1_YEAR_AGO' },
    { name: 'Started before ' + (new Date().getFullYear() - 5), value: 'BEFORE_5_YEAR_AGO' },
  ];
  
  annualSalesArray:any =[
    { name: '$0 - $50K', value: '1' },
    { name: '$50K - $100K', value: '2' },
    { name: '$100K - $200K', value: '3' },
    { name: '$200K - $500K', value: '4' },
    { name: '$500K - $1M', value: '5' },
    { name: '$1M - $3M', value: '6' },
    { name: '$3M - $5M', value: '7' },
    { name: '$5M - $10M', value: '8' },
    { name: '> $10M', value: '9' },
  ];

  defaultLanguageArray: any = [
    {name: 'English'},
    {name: 'Français'},
    {name: 'Deutsch'},
    {name: "Italiano"},
    {name: "Español"},
    {name: "Svenska"},
    {name: "Dansk"},
    {name: "Nederlands"},
    {name: "Português"},
  ]

  productCatArray: any = [
    { name: 'Home & Living', value: '1' },
    { name: 'Bath & Bedding', value: '2' },
    { name: 'Food & Drink', value: '3' },
    { name: 'Woman', value: '4' },
    { name: 'Beauty & Wellness', value: '5' },
    { name: 'Paper & Novelty', value: '6' },
    { name: 'Kids & Baby', value: '7' },
    { name: 'Men', value: '8' },
    { name: 'Jewelry', value: '9' },
    { name: 'Pets', value: '10' },
    { name: 'Other', value: '11' },
  ]

  constructor(private storage: StorageMap, private apiService: ApiService,private toast: NgToastService, private router: Router ) { }

  ngOnInit(): void {
    this.storage.get('user_email').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let uEmail = JSON.parse(JSON.stringify(user));
        this.email = uEmail;  
        // alert(this.email);  
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },
    });

    this.getCountries();
    this.getVendorCount();
    this.country_code = '962';
  }

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
    })
  }

  getVendorCount() {
    this.apiService.vendorCount().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.vendorCount = response.data;
    })
  }

  tagsCheckboxChange(e: any) {
    if (e.target.checked) {
      this.tagsToolsArray.push(e.target.value);
    } else {
      this.tagsToolsArray = this.tagsToolsArray.filter((item:any) => item !== e.target.value);
    }
  }

  onProCatChange(e: any) {
   
    if (e.target.checked) {
      this.proCatArray.push(e.target.value);
    } else {
      this.proCatArray = this.proCatArray.filter((item:any) => item !== e.target.value);
    }
  }

  storeTypeCheckboxChange(e: any) {
   
    this.chekedStoreTypeArray = [];

    if (e.target.checked) {
      this.chekedStoreTypeArray.push(e.target.value);
    } else {
      this.chekedStoreTypeArray = this.chekedStoreTypeArray.filter((item:any) => item !== e.target.value);
    }
    
  }

  forPhoneCode(event: any){
    let id = event.target.value;
    let country = this.countriesArray.filter((item: any) => item.id == id);
    this.country_code = country[0].phone_code;
  }

  sendUserFormStep1(userFormStep1: any) {
    this.btnDis = true;
    let values = {
      email: this.email
    }
    this.apiService.checkEmail(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == false){
          this.errorMsg = response.msg;
          this.btnDis= false;
        } else {
          this.nextOneFunction();
          this.errorMsg = '';
          this.btnDis= false;
        }
    },(error) => {
      this.toast.error({detail:"Something went wrong. Please try again!",summary: "" ,duration: 4000});
      this.btnDis= false;
    })
    return true;
  }

  senduserFormStep2(userFormStep2: any) {
    this.nextThreeFunction();
  }

  senduserFormStep3(userFormStep3: any) {
    this.nextFourFunction();
  }
  
  senduserFormStep4(userFormStep4: any) {   
    if(this.describe_stores && this.describe_stores.length > 0) {
      this.nextFiveFunction();
    }
  }

  senduserFormStep5(userFormStep5: any) {   
    if(this.proCatArray && this.proCatArray.length > 0) {
      this.nextSixFunction();
    }
  }

  senduserFormStep6(userFormStep6: any) {   
    this.btnDis = true;
    let values = {
      retailer_id: this.retailer_id,
      country: this.country,
      country_code: this.country_code,
      email: this.email,
      first_name: this.first_name,
      language: this.language,
      last_name: this.last_name,
      password: this.password,
      phone_number: this.phone_number,
      sign_up_for_email: this.sign_up_for_email,
      store_type: this.store_type,
      annual_sales: this.annual_sales,
      store_name: this.store_name,
      website_url: this.website_url,
      years_in_business: this.years_in_business,
      store_desc: this.describe_stores,
      store_cats: this.proCatArray,
      store_tags : this.tagsToolsArray,
      store_about : this.tag_shop_page_about
    }
    if(this.tag_shop_page_about == undefined && this.tagsToolsArray.length == 0 ) {
      this.errorMsg = 'This field is required!'
      this.btnDis= false;
      return false;
    } else {
      this.apiService.retailerRegistration(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
          if(response.res == false){
            this.errorMsg = response.msg;
            this.btnDis= false;
          } else {
            this.nextSevenFunction();
            this.errorMsg = '';
            this.btnDis= false;
          }
          
      },(error) => {
        this.toast.error({detail:"Something went wrong. Please try again!",summary: "" ,duration: 4000});
        this.btnDis= false;
      })
      return true;
    }
  }

  storeCheckboxChange(event: any) {
    if(event.target.checked) {
      this.describe_stores.push(event.target.value);
    } else {
      this.describe_stores = this.describe_stores.filter((item: any) => item !== event.target.value);
    }
  }

  onClickStart() {
    this.btnDis= true;
    let values = {
      email: this.email,
      password: this.password
    }
    this.apiService.vendorSignIn(values).subscribe((responseBody1) => {
      let response1 = JSON.parse(JSON.stringify(responseBody1));
      if (response1.res === false) {
        this.btnDis= false;
        this.toast.error({detail:response1.msg ,summary: "" ,duration: 4000});
      } else {
        this.storage
        .set('user_session', JSON.parse(JSON.stringify(response1.data)))
        .subscribe(() => {});
        localStorage.setItem('local_data', response1.data.role);
        localStorage.setItem('authorization_data', JSON.stringify(response1.data.authorisation));
        this.router.navigateByUrl('/retailer-home').then(() => {
        });
        this.toast.success({detail:"Login successful.",summary: "" ,duration: 4000});
        this.btnDis= false;
      }
    }, (error) => {
      this.btnDis = false;
      this.toast.error({detail:"Something went wrong. Please try again!",summary: "" ,duration: 4000});
    });
  }
  
  stepOneHeading = "Welcome to BAZAR";
  stepOnePara = `Purchase from over ${this.vendorCount} unique vendors. Sign up for free`;

  stepTwoHeading1 = "What Type of Store Do You Have?";
  stepTwoPara1 = "Select the one that suits you best!";
  
  storeTypeArray:any = [
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Brick and mortar",
      textPath: "I sell from my own rentail storefront"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Pop-up shop",
      textPath: "I sell from my own rentail storefront"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Online only",
      textPath: "I sell from my own rentail storefront"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Other",
      textPath: "I sell from my own rentail storefront"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "I'm just shopping for myself",
      textPath: "I sell from my own rentail storefront"
    }
  ]

  stepTwoHeading2 = "Sorry, Bazar is only Available to Retailers";
  stepTwoPara2 = "Select Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries";

  stepTwoHeading3 = "Tell Us About Your Store";
  stepTwoPara3 = `Purchase from over ${this.vendorCount} uniquue vendors. Sign up for free`;

  stepThreeHeading1 = "What Best Describes Your Store?";
  stepThreePara1 = "We will use it to find your best match!";

  storeDescribeArray:any = [
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Restaurant",
      HeadTextData: "1",
      checkboxes:[
        {
          imgPath: "assets/images/online-store1.png",
          HeadText: "Restaurant",
          HeadTextData: "2"
        },
        {
          imgPath: "assets/images/online-store1.png",
          HeadText: "Supermarket",
          HeadTextData: "3",
        },
        {
          imgPath: "assets/images/online-store1.png",
          HeadText: "Health & Wellness Store",
          HeadTextData: "4"
        }
      ]
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Supermarket",
      HeadTextData: "5"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Health & Wellness Store",
      HeadTextData: "6"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Convenience store",
      HeadTextData: "7"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Recreational Center",
      HeadTextData: "8"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Fashion Boutique",
      HeadTextData: "9"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Makeup & Cosmetics Store",
      HeadTextData: "10"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Perfume Store",
      HeadTextData: "11"
    }
  ]

  stepThreeHeading2 = "What Categories Are You Interested In";

  productAccordionArray:any = [
    {
      imgPath: "assets/images/user-registration-step-three-accordion-img.png",
      accordionheading: "Home & Living",
      collapseOne: "collapse1",
      checkboxesArray: [
        {
          checkboxText: "Kitchen"
        },
        {
          checkboxText: "Candles & Holders"
        },
        {
          checkboxText: "Decor"
        },
        {
          checkboxText: "Wall decor"
        },
        {
          checkboxText: "Garden"
        },
        {
          checkboxText: "Home fragrances"
        },
        {
          checkboxText: "Pillows & Blankets"
        },
        {
          checkboxText: "Storage & Organisation"
        }
      ]
    },
    {
      imgPath: "assets/images/user-registration-step-three-accordion-img.png",
      accordionheading: "Home & Living",
      collapseOne: "collapse2",
      checkboxesArray: [
        {
          checkboxText: "Kitchen"
        },
        {
          checkboxText: "Candles & Holders"
        },
        {
          checkboxText: "Decor"
        },
        {
          checkboxText: "Wall decor"
        },
        {
          checkboxText: "Garden"
        },
        {
          checkboxText: "Home fragrances"
        },
        {
          checkboxText: "Pillows & Blankets"
        },
        {
          checkboxText: "Storage & Organisation"
        }
      ]
    },
    {
      imgPath: "assets/images/user-registration-step-three-accordion-img.png",
      accordionheading: "Home & Living",
      collapseOne: "collapse3",
      checkboxesArray: [
        {
          checkboxText: "Kitchen"
        },
        {
          checkboxText: "Candles & Holders"
        },
        {
          checkboxText: "Decor"
        },
        {
          checkboxText: "Wall decor"
        },
        {
          checkboxText: "Garden"
        },
        {
          checkboxText: "Home fragrances"
        },
        {
          checkboxText: "Pillows & Blankets"
        },
        {
          checkboxText: "Storage & Organisation"
        }
      ]
    },
    {
      imgPath: "assets/images/user-registration-step-three-accordion-img.png",
      accordionheading: "Home & Living",
      collapseOne: "collapse4",
      checkboxesArray: [
        {
          checkboxText: "Kitchen"
        },
        {
          checkboxText: "Candles & Holders"
        },
        {
          checkboxText: "Decor"
        },
        {
          checkboxText: "Wall decor"
        },
        {
          checkboxText: "Garden"
        },
        {
          checkboxText: "Home fragrances"
        },
        {
          checkboxText: "Pillows & Blankets"
        },
        {
          checkboxText: "Storage & Organisation"
        }
      ]
    },
    {
      imgPath: "assets/images/user-registration-step-three-accordion-img.png",
      accordionheading: "Home & Living",
      collapseOne: "collapse5",
      checkboxesArray: [
        {
          checkboxText: "Kitchen"
        },
        {
          checkboxText: "Candles & Holders"
        },
        {
          checkboxText: "Decor"
        },
        {
          checkboxText: "Wall decor"
        },
        {
          checkboxText: "Garden"
        },
        {
          checkboxText: "Home fragrances"
        },
        {
          checkboxText: "Pillows & Blankets"
        },
        {
          checkboxText: "Storage & Organisation"
        }
      ]
    }
  ]

  stepThreeHeading3 = "What's Important to You and Your Customers";
  stepThreePara3 = "Your opinion matters!";

  customerKnownArray:any = [
    {
      HeadText: "Eco-friendly",
    },
    {
      HeadText: "Not on Amazon",
    },
    {
      HeadText: "Made in Europe",
    },
    {
      HeadText: "Social good",
    },
    {
      HeadText: "Shop local",
    },
    {
      HeadText: "Local brand",
    }
  ]

  stepfourHeading1 = "Congratulations!";
  stepFourPara1 = "Your account has been created!";

  step1:boolean= true;
  step2:boolean= false;
  step3:boolean= false;
  step4:boolean= false;
  step5:boolean= false;
  step6:boolean= false;
  step7:boolean= false;
  step8:boolean= false;

  nextOneFunction(){
    $(".step_one").addClass("complete");
    $(".step_one").removeClass("active");
    $(".step_two").addClass("active");
    this.step1= false;
    this.step2= true;
    this.step3= false;
    this.step4= false;
    this.step5= false;
    this.step6= false;
    this.step7= false;
    this.step8= false;
  }

  nextTwoFunction(){
    this.step1= false;
    this.step2= false;
    this.step3= true;
    this.step4= false;
    this.step5= false;
    this.step6= false;
    this.step7= false;
    this.step8= false;
  }

  nextThreeFunction(){
    this.step1= false;
    this.step2= false;
    this.step3= false;
    this.step4= true;
    this.step5= false;
    this.step6= false;
    this.step7= false;
    this.step8= false;
  }

  nextFourFunction(){
    $(".step_two").addClass("complete");
    $(".step_two").removeClass("active");
    $(".step_three").addClass("active");
    this.step1= false;
    this.step2= false;
    this.step3= false;
    this.step4= false;
    this.step5= true;
    this.step6= false;
    this.step7= false;
    this.step8= false;
  }

  nextFiveFunction(){
    this.step1= false;
    this.step2= false;
    this.step3= false;
    this.step4= false;
    this.step5= false;
    this.step6= true;
    this.step7= false;
    this.step8= false;
  }

  nextSixFunction(){
    this.step1= false;
    this.step2= false;
    this.step3= false;
    this.step4= false;
    this.step5= false;
    this.step6= false;
    this.step7= true;
    this.step8= false;
  }

  nextSevenFunction(){
    $(".step_three").addClass("complete");
    $(".step_three").removeClass("active");
    $(".step_four").addClass("active");
    this.step1= false;
    this.step2= false;
    this.step3= false;
    this.step4= false;
    this.step5= false;
    this.step6= false;
    this.step7= false;
    this.step8= true;
  }

  backOneFunction(){
    $(".stepAll").removeClass("active");
    $(".stepAll").removeClass("complete");
    $(".step_one").addClass("active");
    this.step1= true;
    this.step2= false;
    this.step3= false;
    this.step4= false;
    this.step5= false;
    this.step6= false;
    this.step7= false;
    this.step8= false;
  }

  backTwoFunction(){
    this.step1= false;
    this.step2= true;
    this.step3= false;
    this.step4= false;
    this.step5= false;
    this.step6= false;
    this.step7= false;
    this.step8= false;
  }

  backThreeFunction(){
    this.step1= false;
    this.step2= false;
    this.step3= true;
    this.step4= false;
    this.step5= false;
    this.step6= false;
    this.step7= false;
    this.step8= false;
  }

  backFourFunction(){
    $(".stepAll").removeClass("active");
    $(".stepAll").removeClass("complete");
    $(".step_one").addClass("complete");
    $(".step_two").addClass("active");
    this.step1= false;
    this.step2= false;
    this.step3= false;
    this.step4= true;
    this.step5= false;
    this.step6= false;
    this.step7= false;
    this.step8= false;
  }

  backFiveFunction(){
    this.step1= false;
    this.step2= false;
    this.step3= false;
    this.step4= false;
    this.step5= true;
    this.step6= false;
    this.step7= false;
    this.step8= false;
  }

  backSixFunction(){
    this.step1= false;
    this.step2= false;
    this.step3= false;
    this.step4= false;
    this.step5= false;
    this.step6= true;
    this.step7= false;
    this.step8= false;
  }

}
