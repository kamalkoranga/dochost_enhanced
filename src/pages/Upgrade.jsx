import { useState } from 'react';
import PricingCard from '../components/PricingCard';
import { HardDrive, Headphones, Shield, Users } from 'lucide-react';

const Upgrade = () => {
  const [activePlan, setActivePlan] = useState('Cloud Plan');
  const [billingCycle, setBillingCycle] = useState('perMinute');

  const plans = [
    {
      name: 'Cloud Plan',
      price: 0,
      description: 'Perfect for trying out DocHost',
      features: [
        '5 MB free storage',
        'Encrypted storage',
        'Anywhere with login',
        'Pre-configured UI',
        'Daily backups',
        'Email support'
      ],
      featured: false
    },
    {
      name: 'Basic Premium Cloud',
      price: billingCycle === 'perMinute' ? 2 : 90,
      description: 'Ideal for individuals and getting started',
      features: [
        'All features of Free Cloud Plan',
        '5 MB free + 5 MB Storage',
        'Encrypted + priority security',
        'Anywhere with login',
        'Zero Downtime',
        '24/7 Priority Support'
      ],
      featured: true
    },
    {
      name: 'Premium Cloud Plan',
      price: billingCycle === 'perMinute' ? 4 : 180,
      description: 'For large storage needs with advanced features',
      features: [
        'Includes Basic Premium Cloud',
        '5 MB free + 10 MB Storage',
        'Easily Upgradable Storage',
        'End-to-end encryption',
        '99.99% uptime SLA',
        'Gets new features first',
      ],
      featured: false
    }
  ];

  const handleSelectPlan = (plan) => {
    if (plan.name !== activePlan) {
      setActivePlan(plan.name);
      // Here you would typically integrate with your payment system
      console.log(`Selected plan: ${plan.name}`);
    }
  };
  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto px-4 pb-12 pt-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DocHost</span> Plan
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Secure, fast, and reliable file hosting for everyone
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`text-sm ${billingCycle === 'perMinute' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Per-Minute
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'perMinute' ? 'perHour' : 'perMinute')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'perHour' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${billingCycle === 'perHour' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Per-Hour
          </span>
          {billingCycle === 'perHour' && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              Save 25%
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isActive={activePlan === plan.name}
            billingCycle={billingCycle}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Have questions? Check out our <a href="#" className="text-blue-600 hover:underline">FAQ</a> or 
          <a href="#" className="text-blue-600 hover:underline ml-1">contact support</a>
        </p>
        <p className="text-sm text-gray-500">
          All plans include a 30-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </div>
    </main>
  );
}

export default Upgrade;