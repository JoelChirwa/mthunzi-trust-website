import { Inngest } from "inngest";
import { serve } from "inngest/express";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "mthunzi-trust",
});

// Example function: Sync Clerk User to MongoDB
export const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const email = email_addresses[0].email_address;
    const name = `${first_name} ${last_name}`;

    return { message: "User sync triggered", userId: id };
  }
);

// Function: Delete user from MongoDB when deleted in Clerk
export const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    const { id } = event.data;
    return { message: "User deletion triggered", userId: id };
  }
);

export const functions = [syncUser, deleteUser];
