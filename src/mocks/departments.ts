export const mockDepartments: DepartmentsResponse = {
  status: 0,
  message: "Success",
  data: [
    {
      id: 1,
      departmentName: "Cardiology",
      description: "Specialized care for heart and cardiovascular system",
      serviceId: 101,
      baseImgUrl: "https://example.com/images/cardiology-bg.jpg",
      iconImgUrl: "https://example.com/images/cardiology-icon.png",
      overview: "Our cardiology department offers comprehensive care for heart-related issues.",
      treatments: [
        {
          id: 1001,
          departmentId: 1,
          treatmentName: "Angioplasty",
          treatmentDescription: "Procedure to open blocked arteries"
        },
        {
          id: 1002,
          departmentId: 1,
          treatmentName: "Echocardiography",
          treatmentDescription: "Ultrasound imaging of the heart"
        }
      ],
      createdBy: "Admin",
      createdDate: "2023-11-07T07:42:12.695Z",
      lastModifiedBy: "Admin",
      lastModifiedDate: "2023-11-07T07:42:12.695Z"
    },
    {
      id: 2,
      departmentName: "Neurology",
      description: "Expert care for brain and nervous system disorders",
      serviceId: 102,
      baseImgUrl: "https://example.com/images/neurology-bg.jpg",
      iconImgUrl: "https://example.com/images/neurology-icon.png",
      overview: "Our neurology department specializes in diagnosing and treating neurological disorders.",
      treatments: [
        {
          id: 2001,
          departmentId: 2,
          treatmentName: "EEG",
          treatmentDescription: "Electroencephalogram to measure brain activity"
        },
        {
          id: 2002,
          departmentId: 2,
          treatmentName: "Stroke Management",
          treatmentDescription: "Rapid response and treatment for stroke patients"
        }
      ],
      createdBy: "Admin",
      createdDate: "2023-11-07T08:30:00.000Z",
      lastModifiedBy: "Admin",
      lastModifiedDate: "2023-11-07T08:30:00.000Z"
    },
    {
      id: 3,
      departmentName: "Pediatrics",
      description: "Comprehensive healthcare for children and adolescents",
      serviceId: 103,
      baseImgUrl: "https://example.com/images/pediatrics-bg.jpg",
      iconImgUrl: "https://example.com/images/pediatrics-icon.png",
      overview: "Our pediatrics department provides care for children from birth through adolescence.",
      treatments: [
        {
          id: 3001,
          departmentId: 3,
          treatmentName: "Vaccination",
          treatmentDescription: "Routine and specialized immunizations for children"
        },
        {
          id: 3002,
          departmentId: 3,
          treatmentName: "Developmental Screening",
          treatmentDescription: "Assessment of child growth and development"
        }
      ],
      createdBy: "Admin",
      createdDate: "2023-11-07T09:15:00.000Z",
      lastModifiedBy: "Admin",
      lastModifiedDate: "2023-11-07T09:15:00.000Z"
    },
    {
      id: 4,
      departmentName: "Orthopedics",
      description: "Specialized care for musculoskeletal system",
      serviceId: 104,
      baseImgUrl: "https://example.com/images/orthopedics-bg.jpg",
      iconImgUrl: "https://example.com/images/orthopedics-icon.png",
      overview: "Our orthopedics department focuses on disorders of the bones, joints, ligaments, tendons, and muscles.",
      treatments: [
        {
          id: 4001,
          departmentId: 4,
          treatmentName: "Joint Replacement",
          treatmentDescription: "Surgical replacement of damaged joints"
        },
        {
          id: 4002,
          departmentId: 4,
          treatmentName: "Fracture Care",
          treatmentDescription: "Treatment of bone fractures and related injuries"
        }
      ],
      createdBy: "Admin",
      createdDate: "2023-11-07T10:00:00.000Z",
      lastModifiedBy: "Admin",
      lastModifiedDate: "2023-11-07T10:00:00.000Z"
    }
  ]
};