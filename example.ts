import Payjp = require("./built");

const PAYJP_SECRET_KEY = process.env.PAYJP_SECRET_KEY;
if (!PAYJP_SECRET_KEY) {
  console.error("Please set the PAYJP_SECRET_KEY environment variable");
  console.error("Usage: PAYJP_SECRET_KEY=sk_test_xxx npx ts-node example.ts");
  process.exit(1);
}

const payjp = Payjp(PAYJP_SECRET_KEY);

async function main() {
  console.log("=== PAY.JP SDK Example ===\n");

  // 1. Retrieve account information
  console.log("1. Retrieving account information...");
  const account = await payjp.accounts.retrieve();
  console.log(`   Account ID: ${account.id}`);
  console.log(`   Email: ${account.email}\n`);

  // 2. Create customer
  console.log("2. Creating customer...");
  const customer = await payjp.customers.create({
    email: "test@example.com",
    description: "Test customer for SDK verification",
  });
  console.log(`   Customer ID: ${customer.id}`);
  console.log(`   Email: ${customer.email}`);
  console.log(`   Description: ${customer.description}\n`);

  // 3. Retrieve customer
  console.log("3. Retrieving customer...");
  const retrievedCustomer = await payjp.customers.retrieve(customer.id);
  console.log(`   Customer ID: ${retrievedCustomer.id}`);
  console.log(`   Created at: ${new Date(retrievedCustomer.created * 1000).toLocaleString()}\n`);

  // 4. List customers
  console.log("4. Listing customers...");
  const customerList = await payjp.customers.list({ limit: 3 });
  console.log(`   Retrieved: ${customerList.data.length}`);
  console.log(`   Total count: ${customerList.count}\n`);

  // 5. Create plan
  console.log("5. Creating plan...");
  const plan = await payjp.plans.create({
    amount: 500,
    currency: "jpy",
    interval: "month",
    name: "Test plan for SDK verification",
  });
  console.log(`   Plan ID: ${plan.id}`);
  console.log(`   Amount: ${plan.amount} JPY/${plan.interval}\n`);

  // 6. List charges
  console.log("6. Listing charges...");
  const chargeList = await payjp.charges.list({ limit: 3 });
  console.log(`   Retrieved: ${chargeList.data.length}`);
  console.log(`   Total count: ${chargeList.count}\n`);

  // 7. Cleanup
  console.log("7. Cleaning up...");
  const deletedPlan = await payjp.plans.delete(plan.id);
  console.log(`   Plan deleted: ${deletedPlan.deleted ? "success" : "failed"}`);
  const deletedCustomer = await payjp.customers.delete(customer.id);
  console.log(`   Customer deleted: ${deletedCustomer.deleted ? "success" : "failed"}\n`);

  console.log("=== Example completed ===");
}

main().catch((error) => {
  console.error("An error occurred:");
  if (error.response?.body) {
    console.error(JSON.stringify(error.response.body, null, 2));
  } else {
    console.error(error.message);
  }
  process.exit(1);
});
