import React from 'react'

function ViewAllUsers({setShowUsers,users}) {
  return (
    <div
          onClick={() => setShowUsers(false)}
          className="fixed inset-0
          bg-black/40 backdrop-blur-sm
          flex items-center justify-center"
          style={{ zIndex: 200 }}
        >

          {/* Panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl
            w-[350px] max-w-[90%]
            shadow-2xl p-5"
          >

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-black font-semibold">
                People in Room
              </h2>

              <button
                onClick={() => setShowUsers(false)}
                className="text-gray-800 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* User List */}
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">

              {users.map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center gap-3
                  p-2 rounded-lg hover:bg-gray-100"
                >

                  <div
                    className="w-9 h-9 rounded-full
                    flex items-center justify-center
                    text-white font-semibold"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name.charAt(0)}
                  </div>

                  <span className="text-sm text-gray-700 font-medium">
                    {user.name}
                  </span>

                </div>
              ))}

            </div>

          </div>
        </div>
  )
}

export default ViewAllUsers