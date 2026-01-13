import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Bids() {
  const { gigId } = useParams();

  const [bids, setBids] = useState([]);
  const [formData, setFormData] = useState({
    message: "",
    price: "",
  });

  // Fetch bids (for gig owner)
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await API.get(`/bids/${gigId}`);
        setBids(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBids();
  }, [gigId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit bid (for freelancer)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/bids", {
        gigId,
        ...formData,
      });

      alert("Bid submitted successfully");
      setFormData({ message: "", price: "" });

      // refresh bids
      const res = await API.get(`/bids/${gigId}`);
      setBids(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit bid");
    }
  };

  // Hire freelancer
  const handleHire = async (bidId) => {
    try {
      await API.patch(`/hire/${bidId}/hire`);
      alert("Freelancer hired successfully");

      // refresh bids after hire
      const res = await API.get(`/bids/${gigId}`);
      setBids(res.data);
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to hire freelancer"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Apply Bid Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Apply to Gig</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            name="message"
            placeholder="Your proposal"
            className="w-full border p-2 rounded"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Your price"
            className="w-full border p-2 rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit Bid
          </button>
        </form>
      </div>

      {/* Bids List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Bids</h2>

        {bids.length === 0 && <p>No bids yet</p>}

        {bids.map((bid) => (
          <div
            key={bid._id}
            className="border-b py-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {bid.freelancerId?.name}
              </p>
              <p>{bid.message}</p>
              <p className="text-sm text-gray-500">₹{bid.price}</p>
              <p className="text-sm font-semibold mt-1">
                Status: {bid.status}
              </p>
            </div>

            {bid.status === "pending" && (
              <button
                onClick={() => handleHire(bid._id)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Hire
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
