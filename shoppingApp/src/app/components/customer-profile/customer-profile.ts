import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.css'
})
export class CustomerProfile {
  activeSection = 'profile';
  isEditing = false;
  
  customer = {
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 9876543210',
    gender: 'male',
    dateOfBirth: '1990-05-15',
    alternatePhone: '+91 9876543211'
  };

  addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'Rahul Sharma',
      address: 'Plot No. 123, Sector 45, Near Metro Station',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'Rahul Sharma',
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