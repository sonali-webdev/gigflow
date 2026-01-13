import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Gigs() {
  const navigate = useNavigate();

  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const fetchGigs = async () => {
    try {
      const res = await API.get("/gigs");
      setGigs(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/gigs", formData);
      alert("Gig posted successfully");
      setFormData({ title: "", description: "", budget: "" });
      fetchGigs();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to post gig");
    }
  };

  if (loading) {
    return <p>Loading gigs...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Create Gig */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Post a Gig</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Gig title"
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Gig description"
            className="w-full border p-2 rounded"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            className="w-full border p-2 rounded"
            value={formData.budget}
            onChange={handleChange}
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Post Gig
          </button>
        </form>
      </div>

      {/* Gig List */}
      <div className="grid gap-4">
        <h2 className="text-2xl font-bold">Available Gigs</h2>

        {gigs.length === 0 && <p>No gigs found</p>}

        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="bg-white p-4 rounded shadow border"
          >
            <h3 className="text-xl font-semibold">{gig.title}</h3>
            <p className="text-gray-600">{gig.description}</p>
            <p className="font-medium mt-2">Budget: ₹{gig.budget}</p>

            <button
              onClick={() => navigate(`/bids/${gig._id}`)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
