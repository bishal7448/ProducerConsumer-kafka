export const eventDefinitions = [
  {
    service: "User Service",
    description: "Manages user registration, profiles, and account lifecycle events.",
    icon: "👤",
    events: [
      {
        type: "USER_REGISTERED",
        label: "Register User",
        badge: "User",
        defaultData: {
          name: "Bishal",
          email: "user@example.com"
        }
      }
    ]
  },
  {
    service: "Order Service",
    description: "Handles course purchasing, order generation, and cancellation flows.",
    icon: "🛒",
    events: [
      {
        type: "ORDER_CREATED",
        label: "Create Order",
        badge: "Order",
        defaultData: {
          courseId: "java-kafka-stream",
          amount: 149
        }
      },
      {
        type: "ORDER_CANCELLED",
        label: "Cancel Order",
        badge: "Order",
        defaultData: {
          reason: "Customer requested cancellation"
        }
      }
    ]
  },
  {
    service: "Payment Service",
    description: "Processes transactions, payment gateway webhooks, and failure handling.",
    icon: "💳",
    events: [
      {
        type: "PAYMENT_COMPLETED",
        label: "Payment Success",
        badge: "Payment",
        defaultData: {
          amount: 149,
          method: "CREDIT_CARD"
        }
      },
      {
        type: "PAYMENT_FAILED",
        label: "Payment Failed",
        badge: "Payment",
        defaultData: {
          reason: "Insufficient balance"
        }
      }
    ]
  },
  {
    service: "Analytics Telemetry",
    description: "Tracks client clickstream telemetry and real-time user interaction events.",
    icon: "📊",
    events: [
      {
        type: "userClick",
        label: "Buy Course Click",
        badge: "Telemetry",
        defaultData: {
          action: "userClick",
          button: "Buy a course"
        }
      }
    ]
  }
];

export default eventDefinitions;

