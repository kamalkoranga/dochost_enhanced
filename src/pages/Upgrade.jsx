import { useEffect, useState } from 'react';
import PricingCard from '../components/PricingCard';
import authservice from '../appwrite/appwrite';
import subscriptionService from '../appwrite/subscriptions';
import { useOutletContext } from 'react-router-dom';

const Upgrade = () => {
  const { setRefreshFiles, activePlan, setActivePlan } = useOutletContext();
  const [billingCycle, setBillingCycle] = useState('perMinute');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // access current user
    const fetchCurrentUser = async () => {
      try {
        const user = await authservice.getCurrentUser();
        if (!user) {
          console.error("No user is currently logged in.");
          return;
        }
        // console.log("Current User:", user);
        setCurrentUser(user);
        fetchSubscription(user.$id);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();

    const fetchSubscription = async (userId) => {
      try {
        const subscription = await subscriptionService.getDocumentByUserID(userId);
        if (subscription) {
          if (subscription.plan === "free") {
            setActivePlan("Cloud Plan");
          } else if (subscription.plan === "basic_premium") {
            setActivePlan("Basic Premium Cloud");
          } else if (subscription.plan === "premium") {
            setActivePlan("Premium Cloud Plan");
          }
          // console.log("Current Subscription:", subscription);
        } else {
          console.log("No subscription found for user.");
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    }

  }, []);

  const plans = [
    {
      name: 'Cloud Plan',
      shortName: 'free',
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
      shortName: 'basic_premium',
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
      shortName: 'premium',
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

  const handleSelectPlan = async (plan) => {
    if (plan.name !== activePlan) {
      setActivePlan(plan.name);
      // console.log(`Selected plan: ${plan.name}`);

      // and update their subscription status in user_subscriptions collection
      try {
        const response = await subscriptionService.addSubscription(currentUser.$id, plan.shortName);
        setRefreshFiles((prev) => prev + 1);
        // console.log("Subscription updated successfully:", response);
      } catch (error) {
        console.error("Error updating subscription:", error);
      }

      // and increase the timeLimit for the plan for 1 minute
      // update the sidebar with new total storage (i.e., 5MB+5MB for Basic Premium Cloud or 5MB+10MB for Premium Cloud Plan)
      // after 1 minute it automatically updates the storage limit back to 5MB
      // Here you would typically integrate with your payment system (future step)
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