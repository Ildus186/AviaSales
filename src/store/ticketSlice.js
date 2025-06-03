import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchId = createAsyncThunk("fetchSearchId", async () => {
  try {
    const response = await fetch(
      "https://aviasales-test-api.kata.academy/search",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status}`);
    }
    const data = await response.json();
    return data.searchId;
  } catch (error) {
    console.error("Error fetching searchId:", error);
    throw error;
  }
});

export const fetchTickets = createAsyncThunk(
  "fetchTickets",
  async (_, thunkAPI) => {
    const searchId = thunkAPI.getState().ticketFilter.searchId;

    if (!searchId) {
      throw new Error("Search ID is not available!");
    }
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  },
);

const ticketSlice = createSlice({
  name: "ticketFilter",
  initialState: {
    checkedList: ["Без пересадок", "1 пересадка", "2 пересадки", "3 пересадки"],
    sort: "cheapest",
    tickets: { tickets: [] },
    loading: "idle",
    searchIdLoaded: false,
    error: null,
    searchId: null,
    stop: null,
    ticketsCount: 5,
  },
  reducers: {
    setCheckedList: (state, action) => {
      state.checkedList = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setTicketsCount: (state) => {
      state.ticketsCount += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.searchId = action.payload;
        state.searchIdLoaded = true;
      })
      .addCase(fetchSearchId.rejected, (state) => {
        state.loading = "failed";
        state.error = "Failed to fetch search ID";
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = "succeeded";
        if (state.tickets.tickets) {
          state.tickets.tickets = [
            ...state.tickets.tickets,
            ...action.payload.tickets,
          ];
        } else {
          state.tickets = action.payload;
        }
        state.stop = action.payload.stop;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch tickets";
      });
  },
});

export const { setCheckedList, setSort, setTicketsCount } = ticketSlice.actions;

export const selectCheckedList = (state) => state.ticketFilter.checkedList;
export const selectSort = (state) => state.ticketFilter.sort;

export const selectTickets = (state) => state.ticketFilter.tickets;
export const selectLoading = (state) => state.ticketFilter.loading;
export const selectError = (state) => state.ticketFilter.error;
export const selectSearchId = (state) => state.ticketFilter.searchId;
export const selectStop = (state) => state.ticketFilter.stop;
export const selectSearchIdLoaded = (state) =>
  state.ticketFilter.searchIdLoaded;
export const selectTicketsCount = (state) => state.ticketFilter.ticketsCount;

export default ticketSlice.reducer;
