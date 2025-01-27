import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StudentDashboard from "../StudentDashboard"; // Adjust path if necessary
import { database, auth } from "../../firebaseConfig"; // Adjust path if necessary


// Mock Firebase configuration
jest.mock("../../firebaseConfig", () => {
  const updateMock = jest.fn();
  const pushMock = jest.fn().mockReturnValue({ key: "mockTransactionKey" });

  // Mock the `ref` function
  const refMock = jest.fn((database, path) => ({
    path, // Store the path for mocking purposes
    onValue: (callback) => {
      // Simulate Firebase data based on the path
      if (path === "menza") {
        callback({
          val: () => ({
            menza1: {
              desert: "Torta",
              glavnoJelo: "Piletina",
              pice: "Sok",
              predjelo: "Juha",
            },
          }),
        });
      } else if (path === "users/testUID") {
        callback({
          val: () => ({
            balance: 100, // Mock initial balance
          }),
        });
      }
    },
  }));

  return {
    database: {
      ref: refMock,
      update: updateMock,
      push: pushMock,
    },
    auth: {
      currentUser: {
        uid: "testUID",
      },
    },
  };
});

describe("StudentDashboard", () => {
  test("decreases student balance when a purchase is made", async () => {
    render(<StudentDashboard />);

    // Wait for the button to render
    const purchaseButton = await screen.findByRole("button", { name: /kupi meni/i });
    expect(purchaseButton).toBeInTheDocument();

    // Click the button
    fireEvent.click(purchaseButton);

    // Assert the balance update
    await waitFor(() => {
      expect(database.update).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ balance: 90 }) // Mock remaining balance after purchase
      );
    });

    // Assert a transaction is logged
    expect(database.push).toHaveBeenCalledWith(expect.anything());
    expect(database.update).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        amount: 10, // Mock purchase amount
        description: expect.stringContaining("Kupnja menija u menzi"),
      })
    );
  });
});