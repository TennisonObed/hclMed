"use client";

import React from "react";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const timeSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

const ScheduleTable: React.FC = () => {
  return (
    <div className="overflow-auto">
      <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Time</th>
            {daysOfWeek.map((day) => (
              <th key={day} className="border border-gray-300 px-4 py-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {time}
              </td>
              {daysOfWeek.map((day) => (
                <td
                  key={day + time}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {/* You can fill this with data */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
