import { Check, Crown, FileText, Zap } from "lucide-react";

const PricingCard = ({ plan, isActive, billingCycle, onSelectPlan }) => {
  const getIcon = () => {
    console.log("Plan Name:", plan.name);
    switch (plan.name) {
      case 'Cloud Plan':
        return <FileText className="w-8 h-8 text-blue-600" />;
      case 'Basic Premium Cloud':
        return <Zap className="w-8 h-8 text-purple-600" />;
      case 'Premium Cloud Plan':
        return <Crown className="w-8 h-8 text-amber-600" />;
      default:
        return <FileText className="w-8 h-8" />;
    }
  };

  const getCardStyles = () => {
    if (plan.featured) {
      return "relative bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 shadow-xl transform scale-105";
    }
    if (isActive) {
      return "relative bg-blue-50 border-2 border-blue-300 shadow-lg";
    }
    return "relative bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow";
  };

  const getButtonStyles = () => {
    if (isActive) {
      return "w-full py-3 px-4 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed";
    }
    if (plan.featured) {
      return "w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105";
    }
    return "w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors";
  };

  return (
    <div className={`${getCardStyles()} rounded-xl p-6 transition-all duration-300`}>
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      {isActive && (
        <div className="absolute -top-3 -right-3">
          <div className="bg-blue-600 text-white rounded-full p-2">
            <Check className="w-4 h-4" />
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          {getIcon()}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="mb-2">
          <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
          {plan.price > 0 && <span className="text-gray-500 ml-1">{billingCycle === 'perMinute' ? '/minute' : '/hour'}</span>}
        </div>
        <p className="text-gray-600 text-sm">{plan.description}</p>
      </div>

      <div className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <button 
        className={getButtonStyles()}
        onClick={() => onSelectPlan(plan)}
        disabled={isActive}
      >
        {isActive ? 'Current Plan' : `Choose ${plan.name}`}
      </button>
    </div>
  );
};

export default PricingCard;