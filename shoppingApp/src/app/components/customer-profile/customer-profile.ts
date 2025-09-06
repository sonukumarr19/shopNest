import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerService } from '../../services/customer-service';
import { UserProfile } from '../../types/user-profile';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
import { Wishlist } from '../wishlist/wishlist';


@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule , Wishlist],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.css'
})
export class CustomerProfile {
  activeSection = 'profile';
  isEditing = false;
  customerService = inject(CustomerService);  
  authService = inject(AuthService);
  
  customer = {
    firstName: 'Sonu',
    lastName: 'Kumar',
    email: 'sonu1234@gmail.com',
    phone: '+91 9876543210',
    gender: 'male',
    dateOfBirth: '2003-12-19',
    alternatePhone: '+91 9876543211'
  };

  ngOnInit() {
    const userId = this.authService.getUserId();  // 👈 get from token
    console.log('Logged-in user ID:', userId);
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }

    this.customerService.getUserProfile(userId).subscribe({
      next: (data) => {
        console.log('User profile API response:', data);

        const [firstName, ...lastNameParts] = data.name?.split(' ') || ['Guest'];
        const lastName = lastNameParts.join(' ');

        this.customer = {
          ...this.customer, // keep defaults for missing fields
          firstName: firstName,
          lastName: lastName || '',
          email: data.email
        };

        console.log('Customer object after mapping:', this.customer);
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
  }


  addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'Sonu Kumar',
      address: 'GDB Hostel , Sector-1 , NIT Rourkela',
      city: 'Rourkela',
      state: 'Odisha',
      pincode: '769008',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'Sonu Kumar',
      address: 'Tower A, 5th Floor, Cyber City',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      phone: '+91 9876543210',
      isDefault: false
    }
  ];

  orders = [
    {
      id: 'OD123456789',
      date: '2024-01-15',
      status: 'Delivered',
      total: 2499,
      items: [
        { name: 'Samsung Galaxy M32 (Black, 128 GB)', image: '', price: 2499 }
      ]
    },
    {
      id: 'OD987654321',
      date: '2024-01-10',
      status: 'Shipped',
      total: 1299,
      items: [
        { name: 'Nike Air Max Shoes', image: '', price: 1299 }
      ]
    }
  ];

  cards = [
    {
      id: 1,
      type: 'Credit Card',
      number: '**** **** **** 1234',
      bank: 'HDFC Bank',
      expiry: '12/26'
    },
    {
      id: 2,
      type: 'Debit Card',
      number: '**** **** **** 5678',
      bank: 'SBI Bank',
      expiry: '08/25'
    }
  ];

  notifications = [
    { type: 'SMS', enabled: true },
    { type: 'Email', enabled: true },
    { type: 'WhatsApp', enabled: false },
    { type: 'Push Notifications', enabled: true }
  ];

  setActiveSection(section: string) {
    this.activeSection = section;
    this.isEditing = false;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  addAddress() {
    console.log('Add new address');
  }

  editAddress(addressId: number) {
    console.log('Edit address:', addressId);
  }

  deleteAddress(addressId: number) {
    this.addresses = this.addresses.filter(addr => addr.id !== addressId);
  }

  setDefaultAddress(addressId: number) {
    this.addresses.forEach(addr => {
      addr.isDefault = addr.id === addressId;
    });
  }

  addCard() {
    console.log('Add new card');
  }

  deleteCard(cardId: number) {
    this.cards = this.cards.filter(card => card.id !== cardId);
  }

  viewOrderDetails(orderId: string) {
    console.log('View order details:', orderId);
  }

  cancelOrder(orderId: string) {
    console.log('Cancel order:', orderId);
  }

  logout() {
    console.log('Logout');
  }
}